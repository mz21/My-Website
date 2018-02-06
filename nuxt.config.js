module.exports = {
  /*
  ** Headers of the page
  */
  plugins: [],
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-111805343-1'
    }]
  ],
  head: {
    title: 'Bits of That',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An interactive book on everything' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '/amplitude.js'
      }
    ]
  },
  css: [
    '@/assets/css/sanitize.css',
    '@/assets/css/github.css',
    // SCSS file in the project
    '@/assets/css/main.sass'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.txt$/,
        use: 'raw-loader',
        exclude: /(node_modules)/
      })
      config.module.rules.push({
        test: /\.csv$/,
        use: 'file-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
