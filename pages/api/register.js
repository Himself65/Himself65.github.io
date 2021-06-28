import { createPrivateKey, createSign, createVerify, randomBytes } from 'crypto'

const privateKeyPem = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')

/**
 *
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export default async function (req, res) {
  const privateKey = await createPrivateKey(privateKeyPem)
  if (!req.body.challenge) {
    // get the random challenge from server
    const challenge = randomBytes(18)
    const sign = createSign('SHA256').update(challenge).sign(privateKey)
    res.status(200).json({
      challenge: Buffer.concat([challenge, sign]),
    })
  } else {
    const { challenge } = req.body
    const buf = Buffer.from(challenge)
    if (createVerify('SHA256').update(buf.slice(0, 15)).verify(privateKey, buf.slice(16))) {
      // is correct challenge
      res.status(200)
    }
  }
}
