const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = (env, argv) => ({
	mode: 'development',
	// context: path.resolve(__dirname, 'src'),
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'production' ? './assets/js/[name].[chunkhash].js' : './assets/js/[name].js',
    chunkFilename: argv.mode === 'production' ? './assets/js/[name].[chunkhash].js' : './assets/js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: argv.mode === 'production' ? false : 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 3000,
    overlay: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: path.join(__dirname, './webpack.ts-transformers.js'),
        },
      },
      {
        test: /\.(webp|png|jpg|svg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: argv.mode === 'production' ? [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new WebpackMd5Hash(),
      new CopyWebpackPlugin({
        patterns: [
          { from: './assets/img', to: './assets/img' },
        ],
      }),
      new CleanWebpackPlugin(),
    ]
    : [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new ErrorOverlayPlugin(),
    ],
});
