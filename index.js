const withSass = require('@zeit/next-sass');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withSass({
  webpack: function(config) {
    config.module.rules.push(
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            name: '[name].[hash:15].[ext]',
          },
        },
      }
    );

    config.plugins.push(new CompressionPlugin());
    config.resolve.alias['@styles'] = path.join(__dirname, 'styles');
    config.resolve.alias['@helpers'] = path.join(__dirname, 'helpers');
    config.resolve.alias['@images'] = path.join(__dirname, 'images');

    return config;
  }
});