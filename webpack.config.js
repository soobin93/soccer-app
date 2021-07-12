const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: path.join(__dirname, 'resources/js/components'),
      api: path.join(__dirname, 'resources/js/api'),
      routes: path.join(__dirname, 'resources/js/routes'),
    }
  }
};
