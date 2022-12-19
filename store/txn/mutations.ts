import type { MutationTree } from 'vuex';
import { ITxnState } from '~/types/store/txn';

const mutations: MutationTree<ITxnState> = {
  SET_TXN: (state, payload: Record<string, string>[]) => {
    state.txn = [...state.txn, ...payload];
  },
  SET_EMPTY_TXN: (state) => {
    state.txn = [];
  },
};

export default mutations;
