import { NuxtAxiosInstance } from '@nuxtjs/axios';

export interface IHTTPClient {
  $get: (url: string, config?: any) => any,
  $post: (url: string, data?: any, config?: any) => any,
  $put: (url: string, data?: any, config?: any) => any,
  $delete: (url: string, config?: any) => any,
}

let axios: NuxtAxiosInstance;

const setHTTPClientInstance = (instance: NuxtAxiosInstance): void => {
  axios = instance;
};

const $get = (url: string, config?: any): any => axios.$get(url, config || null);

const $post = (url: string, data?: any, config?: any): any => axios.$post(url, data, config);

const $delete = (url: string, config?: any): any => axios.$delete(url, config);

const $put = (url: string, data?: any, config?: any): any => axios.$put(url, data, config);

export default {
  $get,
  $post,
  $delete,
  $put,
} as IHTTPClient;

export {
  setHTTPClientInstance,
};
