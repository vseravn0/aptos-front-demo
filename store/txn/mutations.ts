import type { MutationTree } from 'vuex';
import { ITxnState } from '~/types/store/txn';

const mutations: MutationTree<ITxnState> = {
  SET_TXN: (state, payload: any[]) => {
    state.txn = payload;
  },
};

export default mutations;
