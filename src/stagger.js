'use strict'

const { Transform } = require('readable-stream')

class Stagger extends Transform {
  constructor (delay, options) {
    super(options)
    this._delay = delay
  }

  _transform (chunk, encoding, done) {
    setTimeout(() => {
      this.push(chunk)
      done()
    }, this._delay)
  }
}

module.exports = Stagger
