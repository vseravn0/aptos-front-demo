import Vue from 'vue';
import { IApiService } from './api';
import { IContractsManager } from './plugins/contractsManager';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: IApiService,
    $contractsManager: IContractsManager
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $api: IApiService,
    $contractsManager: IContractsManager
  }
}
