const mix = require('laravel-mix');
const path = require('path');

// Config
mix.alias({
  components: path.join(__dirname, 'resources/js/components'),
  api: path.join(__dirname, 'resources/js/api'),
});

// Mapping
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .version();
