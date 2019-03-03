'use strict'

const { createReadStream, createWriteStream } = require('fs')

const [, , src, dest] = process.argv
const srcStream = createReadStream(src)
const destStream = createWriteStream(dest)
srcStream.on('data', data => destStream.write(data))
