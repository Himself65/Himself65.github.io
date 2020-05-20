import { mapObject } from '.'
import { FnDecorator } from './src/proxy'
import { multiMatrix } from './src/matrix'
import { EventEmitter } from 'events'

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

describe('function multiMatrix', () => {
  it('base test', () => {
    const A = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
    const B = [
      [100, 0, 100],
      [12, 1, -1],
      [-100, 233, 32]
    ]
    expect(multiMatrix(A, B)).toEqual([...B])
  })

  it('P53-9', () => {
    const A = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ]
    const counts = (A: number[][]): number =>
      A.reduce((count, row) =>
        row.reduce((count, val) => count + val, count), 0)
    const event = new EventEmitter().on('calculate', console.log)
    expect(counts(multiMatrix(A, A, event))).toEqual(2)
  })
})
