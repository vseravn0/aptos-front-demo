import type { ActionTree } from 'vuex/types/index';
import { IAptosState } from '~/types/store/aptos';
import { IRootState } from '~/types/store';
import BigNumber from 'bignumber.js';
import {
  APTOS_COIN_HEADERS,
  APTOS_NETWORK_MAINNET,
  APTOS_NETWORK_TESTNET,
  NETWORKS_SHORT_NAMES,
  APT_TOKEN,
} from '~/utils/constants';
import AptosManager from '~/core/AptosManager';
import { initUserDataState } from '~/store/aptos/state';

declare global {
  interface Window { aptos: any; }
}

const { aptos } = window;

const actions: ActionTree<IAptosState, IRootState> = {

  async connectWallet({ commit }) {
    const client = new AptosManager();
    await client.connectWallet();
    commit('SET_CHAIN_ID', client.getChainId);
    commit('SET_USER_DATA', client.userData);
    commit('SET_IS_CONNECTED', client.isConnected);
  },

  async disconnectWallet({ commit }) {
    await aptos.disconnect();
    commit('SET_USER_ADDRESS', initUserDataState);
    commit('SET_IS_CONNECTED', false);
  },

  async updateTokenBalance({ commit, rootGetters }) {
    // fetch variant
    // const res = await this.$api.aptosService.getUserBalance(
    //   rootGetters['web3/getUserAddress'],
    // );
    // sdk variant
    const client = new AptosManager();
    const res = await client.getBalance(rootGetters['aptos/getUserAddress'], APT_TOKEN);
    commit('SET_USER_BALANCE', new BigNumber(res).shiftedBy(-rootGetters['aptos/getTokenData'].decimals).toFixed());
  },
  async getTokenData({ commit }) {
    // fetch variant
    // const res = await this.$api.aptosService.getTokenData();
    // sdk variant
    const client = new AptosManager();
    const res = await client.getTokenData(APT_TOKEN);
    commit('SET_TOKEN_DATA', res);
  },
  async sendTransaction(_, txn) {
    await aptos.signAndSubmitTransaction(txn);
  },
  async signTransaction(_, tnx) {
    const signature = await aptos.signTransaction(tnx);
    console.log(signature);
  },
  async getGasPrice({ commit }) {
    const res = await this.$api.aptosService.getGasPrice();
    commit('SET_GAS_PRICE', res);
  },
  async getNonce({ commit, rootGetters }) {
    const res = await this.$api.aptosService.getNonce(rootGetters['web3/getUserAddress']);
    commit('SET_NONCE', res);
  },
  // async sendSignature({ commit, rootGetters }, { wallet, params }) {
  //   if (wallet === APTOS_WALLETS.PETRA) {
  //     await window[wallet].signTransaction(params);
  //   } else {
  //     const transaction = await window[wallet].generateTransaction(rootGetters['web3/getUserAddress'], params);
  //     const signature = await window[wallet].signTransaction(transaction);
  //     commit('SET_SIGNATURE', signature);
  //   }
  // },
  // async sendTokenBridge({ rootGetters }, payload) {
  //   const data = {
  //     sender: rootGetters['web3/getUserAddress'],
  //     sequence_number: rootGetters['aptos/getNonce'],
  //     max_gas_amount: '999999999',
  //     gas_unit_price: rootGetters['aptos/getGasPrice'].toString(),
  //     expiration_timestamp_secs: '32425224034',
  //     signature: {
  //       type: 'ed25519_signature',
  //       public_key: rootGetters['web3/getPublicKey'],
  //       signature: '0x313239203234322035352038372032313920313434203937203738203139342038392031343020323435203120343220363620323439203130392035332031323720323137203131392031333920333420323434203739203231372031393720353320323232203232372032303320313331203120302030203020302030203020302032203131382031382032333520323232203632203230342039342032343520313732203134362037322031203239203136342032353320353920323033203231342031343920323436203639203420313432203131312033312032303220313432203331203134352032303220323232203236203620363620313134203130352031303020313033203130312034203131352031303120313130203130302031203720313138203138203233352032323220363220323034203934203234352031373220313436203732203120323920313634203235332035392032303320323134203134392032343620363920342031343220313131203331203230322031343220333120313435203230322032323220323620313520383320313137203131322031313220313131203131342031313620313031203130302038342031313120313037203130312031313020313135203420383520383320363820383420302033203332203020302030203020302030203020302030203020302030203620383520313235203630203131372032353120312036362032313720333820383620313635203939203939203939203230302037352039392032313020323038203820313637203534203137302030203020302030203020382030203230322031353420353920302030203020302031313220342030203020302030203020302031303020302030203020302030203020302032343920323038203134352039392030203020302030203220302033322032323220363020323038203737203131302031343020313034203630203230352031303920313133203139312032303220313237203631203438203836203231372031303420313937203131372031393120323236203434203135392031303220323239203231352036302034203138362033352036342032343020313338203430203132392033203135392031343620323530203130392035302036392039342031313820383720313020313320333720323034203139342033322033332037312031342033302032343020313934203231302037332031333720373920323133203520323920313933203334203831203539203134312031312036312032323220313839203130332033382033342031303420313220323533203135322037203630203132312032302033312037382031313220373520313536203234392031313920313034203137362039312039',
  //     },
  //     payload: {
  //       type: 'entry_function_payload',
  //       ...payload,
  //     },
  //   };
  //   await this.$api.aptosService.sendTokenBridge(data);
  // },
};

export default actions;
