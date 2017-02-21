const path = require('path');

const client = {
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    stats: 'verbose',
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  }
};

const server = {
  entry: './src/server'
}

module.exports = client;
