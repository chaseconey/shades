const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'app.css'
})

function sassRules () {
  return [
    {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
    }
  ]
}

module.exports = {
  entry: [
    './resources/assets/sass/app.scss'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    rules: sassRules()
  },
  plugins: [
    extractSass
  ]
}
