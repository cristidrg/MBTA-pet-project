import pkg from './package'

export default {
  mode: 'universal',
  router: {
    middleware: 'i18n'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'cyan' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/_reset.scss'
  ],

  /*
  ** Place shared style resources here. Colors, typography, mixins, etc...
  */
  styleResources: {
    scss: [
       '@/assets/scss/_colors.scss',
       '@/assets/scss/_typography.scss',
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/mbtaClient.js',
    '~/plugins/i18n.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
