/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-react-refresh'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    splitting: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none'
  },
  buildOptions: {
    baseUrl: './',
    out: 'dist/www'
  },
};
