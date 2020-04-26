const async_hooks = require('async_hooks')
const { createHook } = async_hooks

const hook = createHook({
  init: (id, type, triggerId) => {
    console.log(`init(${id}) ${type}:`, triggerId)
  },
  promiseResolve: (id) => {
    console.log('promiseResolve:', id)
  }
})

async function readFromDB (id, userName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('resolve')
      resolve(`${userName} ${id}`)
    }, 1000)
    console.log('--- start setTimeout ---')
  })
}

console.log('start')
hook.enable()
readFromDB(233, 'himself65').then(response => {
  console.log('end:', response)
})
