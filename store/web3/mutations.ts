import type { MutationTree } from 'vuex/types/index';
import ConnectionWeb3 from '~/core/ConnectionWeb3';
import { ITransaction } from '~/core/contracts/Token';
import { IWeb3V2State, ITokensMap } from '~/types/store/web3';

const mutations: MutationTree<IWeb3V2State> = {
  SET_IS_CONNECTED: (state, payload: boolean) => {
    state.isConnected = payload;
  },
  SET_USER_ADDRESS: (state, address: string) => {
    console.log('SET_USER_ADDRESS', ConnectionWeb3.getInstance());
    state.userAddress = address;
  },
  SET_CHAIN_ID: (state, chainId: number) => {
    console.log('SET_CHAIN_ID', ConnectionWeb3.getInstance());
    state.chainId = chainId;
  },
  DISCONNECT_WALLET: (state) => {
    state.userAddress = '';
    state.isConnected = false;
  },
  SET_TOKENS_MAP: (state, map: ITokensMap) => {
    state.tokensMap = map;
  },
  UPDATE_ALL_TOKENS_BALANCE: (state, balances) => {
    balances.forEach((balance: any) => {
      state.tokensMap[balance.address].balance = balance.balance;
    });
  },
  UPDATE_TOKEN_BALANCE: (state, { balance, address }) => {
    state.tokensMap[address].balance = balance;
  },
  SET_TRANSACTION: (state, transaction: ITransaction) => {
    if (!state.transactionsMap[transaction.transactionHash]) {
      state.transactionsMap[transaction.transactionHash] = transaction;
    }
  },
};

export default mutations;
