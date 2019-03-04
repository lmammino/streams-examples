const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/browser/app.js',
  output: {
    path: path.resolve(path.join(__dirname, 'src', 'browser')),
    filename: 'app.bundle.js'
  }
}
