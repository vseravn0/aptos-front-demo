import type { ActionTree } from 'vuex/types/index';
import { IAptosState } from '~/types/store/aptos';
import { IRootState } from '~/types/store';
import BigNumber from 'bignumber.js';
import AptosManager from '~/core/AptosManager';

const { APT_TOKEN } = process.env;
const client = new AptosManager();

const actions: ActionTree<IAptosState, IRootState> = {

  async connectWallet({ commit }) {
    await client.connectWallet();
    commit('SET_CHAIN_ID', client.getChainId);
    commit('SET_USER_DATA', client.userData);
    commit('SET_IS_CONNECTED', client.isConnected);
  },

  disconnectWallet() {
    client.disconnect();
  },

  async updateTokenBalance({ commit, rootGetters }) {
    // fetch variant
    // const res = await this.$api.aptosService.getUserBalance(
    //   rootGetters['web3/getUserAddress'],
    // );

    // sdk variant
    const res = await client.getBalance(rootGetters['aptos/getUserAddress'], APT_TOKEN as string);
    commit('SET_USER_BALANCE', new BigNumber(res).shiftedBy(-rootGetters['aptos/getTokenData'].decimals).toFixed());
  },
  async getTokenData({ commit }) {
    // fetch variant
    // const res = await this.$api.aptosService.getTokenData();

    // sdk variant
    const res = await client.getTokenData(APT_TOKEN as string);
    commit('SET_TOKEN_DATA', res);
  },
  async sendTransaction(_, txn) {
    await client.sendAndSubmitTnx(txn);
  },
  async signTransaction(_, tnx) {
    await client.signTnx(tnx);
  },

  // fetch variant
  async getGasPrice({ commit }) {
    const res = await this.$api.aptosService.getGasPrice();
    commit('SET_GAS_PRICE', res);
  },
  async getNonce({ commit, rootGetters }) {
    const res = await this.$api.aptosService.getNonce(rootGetters['web3/getUserAddress']);
    commit('SET_NONCE', res);
  },
};

export default actions;
