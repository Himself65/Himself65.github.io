const binding = require('./build/Release/binding')

const state = binding.testDeadLock((...args) => {
  console.log(args)
})

console.log(state)
