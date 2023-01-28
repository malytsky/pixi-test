const path = require('path');

module.exports = {
  entry: './src/game.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          exclude: "/node_modules/",
          test: /\.png$/,
          use: ['file-loader'],
      },
      {
        exclude: "/node_modules/",
        test: /\.jpg$/,
        use: ['file-loader'],
    },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
  },
};