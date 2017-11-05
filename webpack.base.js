module.exports = {
  // webpack to run bable on every file
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0', // async code
            // env is master prefix
            // to hit latest versions of last 2 browsers
            ['env', {targets: { browsers: ['last 2 versions']}}]
          ]
        } 
      }
    ]
  }
};