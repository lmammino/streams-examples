'use strict'

const { Transform } = require('readable-stream')

class Delay extends Transform {
  constructor (ms, options) {
    super(options)
    this._ms = ms
  }

  _transform (chunk, encoding, done) {
    setTimeout(() => {
      this.push(chunk)
      done()
    }, this._ms)
  }
}

module.exports = Delay
