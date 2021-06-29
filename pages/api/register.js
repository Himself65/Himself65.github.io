import { NextApiResponse, NextApiRequest } from 'next'
import { Fido2Lib } from 'fido2-lib'
import { withIronSession, Session } from 'next-iron-session'

const privateKeyPem = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
const fido2Lib = new Fido2Lib({
  rpId: 'himself65.com',
  cryptoParams: [-7],
  authenticatorUserVerification: 'required',
})

/**
 *
 * @param req {NextApiRequest & { session: Session }}
 * @param res {NextApiResponse}
 */
export default withIronSession(
  async function (req, res) {
    if (!req.body.data && req.method === 'GET') {
      const assertionOptions = await fido2Lib.assertionOptions()

      console.log(assertionOptions)
      req.session.set('webauthn', {
        challenge: Buffer.from(assertionOptions.challenge),
      })
      await req.session.save()

      res.status(200).json({
        ...assertionOptions,
        challenge: Buffer.from(assertionOptions.challenge),
      })
    } else if (req.method === 'POST') {
      const { challenge: expectedChallenge } = req.session.get('webauthn')
      const {
        data: {
          id,
          response: { clientDataJSON, attestationObject },
        },
      } = req.body
      const attestation = {
        id: Buffer.from(id),
        response: {
          clientDataJSON: `${clientDataJSON}`,
          attestationObject: `${attestationObject}`,
        },
      }
      const result = await fido2Lib.attestationResult(attestation, {
        challenge: Buffer.from(expectedChallenge).toString('base64'),
        origin: 'himself65.com',
        factor: 'either',
      })
    }
  },
  {
    password: privateKeyPem,
    cookieName: 'webauthn',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
)
