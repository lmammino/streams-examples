'use strict'

const { pipeline } = require('stream')
const { createEncgz } = require('./encgz-stream')

const [, , secret] = process.argv

const encgz = createEncgz(secret)
console.error(`init vector: ${encgz.initVect.toString('hex')}`)

pipeline(process.stdin, encgz, process.stdout, function onEnd (err) {
  if (err) {
    console.error(`Error: ${err}`)
    process.exit(1)
  }
})
