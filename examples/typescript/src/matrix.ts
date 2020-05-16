export const multiMatrix = (A: number[][], B: number[][]) =>
  Array.from({ length: A.length }).map((_, row) =>
    Array.from({ length: B.length }).map((_, column) =>
      Array.from({ length: A[row].length })
        .reduce((sum: number, _, k) => sum + A[row][k] * B[k][column], 0)
    )
  )
