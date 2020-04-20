module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'index.js'
  },
  externals: {
    util: './src/externals/utils.js'
  }
}
