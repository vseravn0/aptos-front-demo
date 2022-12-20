import type { ActionTree } from 'vuex';
import { IRootState } from '~/types/store';
import { IModalKey, IModalsState } from '~/types/store/modals';

const actions: ActionTree<IModalsState, IRootState> = {
  show({ commit }, payload: IModalKey) {
    console.log(payload.key);
    commit('SET_IS_SHOW', true);
    commit('SET_CURRENT_MODAL_KEY', payload.key);
  },
  hide({ commit }) {
    commit('SET_IS_SHOW', false);
    commit('SET_CURRENT_MODAL_KEY', '');
  },
};

export default actions;
