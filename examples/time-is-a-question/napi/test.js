const binding = require('./build/Release/binding')

const state = binding.testDeadLock()

console.log(state)
