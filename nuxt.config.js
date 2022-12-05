// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import localeEn from './locales/en.json';
import StyleLintPlugin from 'stylelint-webpack-plugin';

dotenv.config();

export default {
  ssr: false,
  head: {
    title: 'frontend-starter-kit-2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/rootColors.scss',
  ],
  styleResources: {
    scss: ['./assets/scss/resourses.scss'],
  },
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    '@nuxtjs/axios',
  ],
  plugins: [
    { src: '@plugins/injectComponents.js' },
    { src: '@plugins/vee-validate.ts' },
    { src: '@plugins/contractsManager.ts' },
    { src: '@plugins/api.ts' },
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    extend(config, ctx) {
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty',
      };
      if (ctx.isDev && ctx.isClient) {
        config.plugins.push(
          new StyleLintPlugin({
            configFile: 'stylelint.config.js',
            exclude: ['.nuxt', 'node_modules'],
            extensions: ['css', 'scss', 'sass', 'vue'],
            fix: true,
            quiet: false,
            failOnError: false,
          }),
        );
      }
    },
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: localeEn,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  axios: {
    baseURL: process.env.API_URL,
  },
  env: {
    INFURA_KEY: process.env.INFURA_KEY,
    IS_MAINNET: process.env.IS_MAINNET,
    API_URL: process.env.API_URL,
  },
};
