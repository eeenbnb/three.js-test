module.exports = {
  entry: './src/main.ts',
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.json'
    ],
  },
  devServer: {
    contentBase: 'docs/',
    inline: true,
    watchContentBase: true
  },
  devtool: 'source-map'
};
