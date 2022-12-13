import type { ActionTree } from 'vuex/types/index';
import { ITxnState } from '~/types/store/txn';
import { IRootState } from '~/types/store';

const actions: ActionTree<ITxnState, IRootState> = {
  async txnRequest({ commit }, payload) {
    const txn = await this.$api.txnService.getUserTxns(payload);
    commit('SET_TXN', txn);
  },
};

export default actions;
