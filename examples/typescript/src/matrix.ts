import { EventEmitter } from 'events'

export const multiMatrix = (A: number[][], B: number[][], IO?: EventEmitter) =>
  Array.from({ length: A.length }).map((_, row) =>
    Array.from({ length: B.length }).map((_, column) =>
      Array.from({ length: A[row].length }).reduce((sum: number, _, k) => {
        const a = A[row][k]
        const b = B[k][column]
        const mul = a * b
        IO?.emit('calculate',
          `A[${row + 1}][${k + 1}](${a}) * B[${k + 1}][${column +
          1}](${b}) = ${mul}`)
        return sum + mul
      }, 0)
    )
  )
