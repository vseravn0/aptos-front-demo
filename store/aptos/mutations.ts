import type { MutationTree } from 'vuex/types/index';
import { IAptosState } from '~/types/store/aptos';

const mutations: MutationTree<IAptosState> = {
  SET_USER_BALANCE: (state, payload:string) => {
    state.userBalance = payload;
  },
  SET_TOKEN_DATA: (state, { name, symbol, decimals }:any) => {
    state.tokenData = { name, symbol, decimals };
  },
  SET_GAS_PRICE: (state, payload:string) => {
    state.gasPrice = payload;
  },
  SET_CHAIN_ID: (state, payload:string) => {
    state.chainId = payload;
  },
  SET_NONCE: (state, payload:string) => {
    state.nonce = payload;
  },
  SET_SIGNATURE: (state, payload:any) => {
    state.signature = payload;
  },
  SET_IS_CONNECTED: (state, payload:boolean) => {
    state.isConnected = payload;
  },
  SET_USER_DATA: (state, payload) => {
    state.userData = payload;
  },
};

export default mutations;
