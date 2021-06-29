async function register(username, displayName) {
  const credential = await fetch('/api/register').then(async (response) => {
    const options = await response.json()
    options.challenge = Buffer.from(options.challenge)
    return navigator.credentials.create({
      publicKey: {
        challenge: options.challenge,
        rp: {
          name: 'himself65-website',
          id: options.rpId,
        },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          displayName,
          name: username,
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      },
    })
  })
  await fetch('/api/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      rawId: Buffer.from(credential.rawId).toString('base64'),
      response: {
        attestationObject: Buffer.from(credential.response.attestationObject).toString('base64'),
        clientDataJSON: Buffer.from(credential.response.clientDataJSON).toString('base64'),
      },
    }),
  })
}
