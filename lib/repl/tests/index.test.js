const { repl } = require('..')

describe('Base Test', () => {
  it('function: repl', async () => {
    expect(repl('')).toBe('')
  })
})
