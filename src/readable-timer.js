'use strict'

const { Readable } = require('stream')

const timerStream = new Readable({
  objectMode: true,
  read () {
    this.push(new Date())
  }
})

timerStream.on('data', (currentDate) => {
  // prints the current second
  console.log(currentDate.getSeconds())
})
