var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname),
  entry: [
    'webpack-hot-middleware/client',
    './src/client/App.jsx'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: [
          [
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              },{
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            }
          ]
        ]
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
