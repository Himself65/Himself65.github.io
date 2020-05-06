const cluster = require('cluster')

if (cluster.isMaster) {
  const workers = []
  const numCPUs = 4
  let waitOnline = numCPUs
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork()
    workers[i] = worker
    worker.on('online', function () {
      if (--waitOnline === 0) {
        for (const worker of workers) {
          if (worker.isConnected()) {
            worker.send('die')
          }
        }
      }
    })
    worker.on('disconnect', function () {
      for (const worker of workers) {
        if (worker.isConnected()) {
          worker.send('die')
        }
      }
    })
  }
} else {
  process.on('uncaughtException', (err) => {
    console.log(err)
  })
  process.on('message', function (msg) {
    if (msg === 'die') {
      if (cluster.worker.isConnected()) {
        cluster.worker.disconnect()
      }
    }
  })
}
