import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import StyleLintPlugin from 'stylelint-webpack-plugin';
import localeEn from './locales/en.json';

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
    'nuxt-clipboard',
    '@nuxtjs/axios',
    'portal-vue/nuxt',
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
        config.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        });
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
    baseURL: process.env.APTOS_NODE_URL,
  },
  env: {
    INFURA_KEY: process.env.INFURA_KEY,
    IS_MAINNET: process.env.IS_MAINNET,
    ETH_TOKEN: process.env.ETH_TOKEN,
    APT_TOKEN: process.env.APT_TOKEN,
    APTOS_NODE_URL: process.env.APTOS_NODE_URL,
    BRIDGE: process.env.BRIDGE,
  },
};
