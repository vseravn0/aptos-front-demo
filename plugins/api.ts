import type { Context } from '@nuxt/types';
import type { Inject } from '@nuxt/types/app';
import api, { setHTTPClientInstance } from '~/api';

export default ({ $axios }: Context, inject: Inject): void => {
  setHTTPClientInstance($axios);
  inject('api', api);
};
