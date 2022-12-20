import type { GetterTree } from 'vuex/types/index';
import { IAptosState } from '~/types/store/aptos';
import { IRootState } from '~/types/store';

const getters: GetterTree<IAptosState, IRootState> = {
  getUserBalance: (state): string => state.userBalance,
  getTokenData: (state): any => state.tokenData,
  getGasPrice: (state): string => state.gasPrice,
  getNonce: (state): string => state.nonce,
  getSignature: (state): string => state.signature,
  getIsConnected: (state): boolean => state.isConnected,
  getUserAddress: (state): string => state.userData.address,
  getUserPubKey: (state): string => state.userData.publicKey,
  getChainId: (state): string | number | null => state.chainId,
};

export default getters;
