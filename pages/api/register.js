import { createPrivateKey, createSign, randomBytes } from 'crypto'

export default async function (req, res) {
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  const keys = await createPrivateKey(privateKey)
  // get the random challenge from server
  const challenge = createSign('SHA256').update(randomBytes(36)).sign(keys)
  res.status(200).json({
    challenge,
  })
}
