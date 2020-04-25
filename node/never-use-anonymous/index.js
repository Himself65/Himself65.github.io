const { EventEmitter } = require('events')

const ee = new EventEmitter()
const kMax = 1e6

function f (q) {
  q.emit('foo')
}

const h = (q) => q.emit('foo')

console.time('function bind')
for (let i = 0; i < kMax; ++i) {
  process.nextTick(ee.emit.bind(ee), 'foo')
}
console.timeEnd('function bind')

console.time('anonymous function creation')
for (let i = 0; i < kMax; ++i) {
  process.nextTick(() => ee.emit('foo'))
}
console.timeEnd('anonymous function creation')

console.time('exist function caller')
for (let i = 0; i < kMax; ++i) {
  process.nextTick(f, ee)
}
console.timeEnd('exist function caller')

console.time('anonymous function caller')
for (let i = 0; i < kMax; ++i) {
  process.nextTick(h, ee)
}
console.timeEnd('anonymous function caller')

