const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: 'development',
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '../css/[name].css',
    }),
  ],
  entry: {
    index: ['./src/index.js', './src/style.scss'],

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/view/js/'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env','@babel/preset-react'],
          plugins: [
            ["@babel/plugin-proposal-class-properties"]
          ]
        }
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: '../',
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        { loader: 'css-loader' }, 
        {
          loader: 'postcss-loader',
          options: {
            // sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        { loader: 'sass-loader' }
      ],
    },
  ]
},

}

