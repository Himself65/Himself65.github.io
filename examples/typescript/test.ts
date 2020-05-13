import { mapObject } from '.'
import { FnDecorator } from './src/proxy'

describe('function mapObject', () => {
  it('should pass', () => {
    const obj = { one: 'hello', two: ',', three: 'world', four: '!' }
    expect(mapObject(obj, str => str.length)).toEqual({
      one: 5,
      two: 1,
      three: 5,
      four: 1
    })
  })
})

describe('function decorator', () => {
  it('should pass', () => {
    const stack = [] as string[]

    class A {
      @FnDecorator(stack)
      fn () {
        stack.push('in the scope')
      }
    }

    (new A()).fn()
    expect(stack).toEqual(['in', 'in the scope', 'out'])
  })
})
