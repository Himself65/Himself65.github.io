export function mapObject<K extends string, T, U> (
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  const res = {} as Record<K, U>
  Object.keys(obj).forEach((key) => { res[key as K] = f(obj[key as K]) })
  return res as Record<K, U>
}
