export function FnDecorator (stack: string[]) {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const oldValue = descriptor.value
    if (!oldValue) {
      return descriptor
    }
    descriptor.value = (...args: any[]) => {
      stack.push('in')
      oldValue(...args)
      stack.push('out')
    }
    return descriptor
  }
}
