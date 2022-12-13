import type { MutationTree } from 'vuex';
import { IModalsState } from '~/types/store/modals';

const mutations: MutationTree<IModalsState> = {
  SET_IS_SHOW: (state:any, payload: boolean) => { state.isShow = payload; },
  SET_CURRENT_MODAL_KEY: (state:any, payload: string) => { state.currentModalKey = payload; },
};

export default mutations;
