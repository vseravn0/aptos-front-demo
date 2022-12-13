import type { GetterTree } from 'vuex/types/index';
import { ITxnState } from '~/types/store/txn';
import { IRootState } from '~/types/store';

const getters: GetterTree<ITxnState, IRootState> = {
  getTxn: (state): any => state.txn,
};

export default getters;
