import type { GetterTree } from 'vuex';
import { IRootState } from '~/types/store';
import { IBridgeState } from '~/types/store/bridge';

const getters: GetterTree<IBridgeState, IRootState> = {
  // getInvoiceFee: (state):string => state.invoiceFee,
};

export default getters;
