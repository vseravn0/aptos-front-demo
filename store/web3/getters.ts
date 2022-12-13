import type { GetterTree } from 'vuex/types/index';
import { IWeb3V2State, ITokensMap, ITransactionsMap } from '~/types/store/web3';
import { IRootState } from '~/types/store';

const getters: GetterTree<IWeb3V2State, IRootState> = {
  getIsConnected: (state): boolean => state.isConnected,
  getChainId: (state): number | string | null => state.chainId,
  getUserAddress: (state): string => state.userAddress,
  getTokensMap: (state): ITokensMap => state.tokensMap,
  getTransactionsMap: (state): ITransactionsMap => state.transactionsMap,
};

export default getters;
