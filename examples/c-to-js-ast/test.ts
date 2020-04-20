import { mapObject } from '.'

describe('function mapObject', () => {
  it('should pass', () => {
    const obj = { one: 'hello', two: ',', three: 'world', four: '!' }
    expect(mapObject(obj, str => str.length))
      .toEqual({
        one: 5,
        two: 1,
        three: 5,
        four: 1
      })
  })
})
