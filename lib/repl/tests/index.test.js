const { ReplInstance } = require('..')

describe('Base Test', () => {
  it('class: ReplInstance', () => {
    const replInstance = new ReplInstance()
    expect(replInstance.repl('')).toBe('')
  })
})
