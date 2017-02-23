const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV === 'development';
function styles() {
  return [{
    test: [/\.scss$/, /\.css$/],
    loaders: [
      'isomorphic-style-loader',
      'css-loader?minimize&modules&localIdentName=[name]_[local]_[hash:base64:3]',
      'sass-loader',
    ],
  },
  {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000',
  },
  {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
  }];
}

const client = {
  entry: [
    path.resolve(__dirname, 'src', 'client', 'index.js'),
    'bootstrap-loader',
  ],
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
          path.resolve(__dirname, 'src'),
        ],
        exclude: 'node_modules',
        loader: 'babel-loader',
      },
    ].concat(styles()),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
const server = {
  devtool: isDevelopment ? 'eval-source-map' : false,
  entry: path.resolve(__dirname, 'src', 'server', 'server.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ].concat(styles()),
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
  // resolveLoader,
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable creating chunks for node
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: isDevelopment,
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
        drop_console: true,
      },
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: [nodeExternals()],
  devServer: {
    historyApiFallback: true,
  },
};
const config = [client];
if (!isDevelopment) {
  config.push(server);
}
module.exports = config;
