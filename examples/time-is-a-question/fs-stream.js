const { createReadStream } = require('fs')

const rs = createReadStream('./1.in', { encoding: 'utf-8' })

rs.on('data', chunk => console.log(chunk))
