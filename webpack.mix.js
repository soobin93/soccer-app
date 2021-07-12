const mix = require('laravel-mix');
const config = require('./webpack.config');

// Config
mix.webpackConfig(config);

// Mapping
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .version();
