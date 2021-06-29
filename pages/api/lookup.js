import { NextApiResponse, NextApiRequest } from 'next'

/**
 *
 * @param req {NextApiRequest & { session: Session }}
 * @param res {NextApiResponse}
 */
export default async function (req, res) {
  if (req.method === 'GET') {
    const { fingerprint } = req.query
    if (!fingerprint) {
      return res.status(500)
    }
    const url = 'https://keys.openpgp.org/pks/lookup?op=get&options=mr&search=' + fingerprint
    const publicKeyPem = await fetch(url).then((response) =>
      response.status === 200 ? response.text() : null
    )
    if (publicKeyPem === null) {
      return res.status(502)
    } else {
      return res.status(200).json({
        publicKey: publicKeyPem,
      })
    }
  } else {
    return res.status(404)
  }
}
