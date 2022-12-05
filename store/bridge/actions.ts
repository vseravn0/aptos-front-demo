import type { ActionTree } from 'vuex';
import Bridge from "~/core/contracts/Bridge";
import { IRootState } from '~/types/store';
import {IBridgeState} from "~/types/store/bridge";
// import { IPaymentState, PAYMENT } from '~/types/store/payment';
// import { INIT_NETWORKS_VALUE } from '~/store/payment/state';

const actions: ActionTree<IBridgeState,IRootState> = {
  async sendSwap({ rootGetters },payload){
    // async payInvoice({ rootGetters }) {
    //   const {
    //     payContract,
    //     payArgs,
    //   } = rootGetters['invoice/getPayContractArgs'];
    //   const contract = new ReceiptBridge({ address: payContract });
    //   await contract.payInvoice(payArgs, rootGetters['web3/getUserAddress']);
    // },
    console.log(rootGetters['web3/getUserAddress'])
    const contract = new Bridge({address: '0xA7edb289c6CCF3e119c1e98D4788f59d45BEd909'})
    console.log(contract)
    await contract.swapToken(['Tether','5','0x06557D3c75fB0142d92656A5636363c84b63d2d0','100000000000000000'],
      rootGetters['web3/getUserAddress'])
  }
  // async fetchPaymentSettings({ commit }) {
  //   const res = await this.$api.paymentService.requestPaymentSettings();
  //   commit(PAYMENT.SET_NETWORKS, res.networks);
  //   commit(PAYMENT.SET_NETWORK_LIST, res.networkList);
  //   commit(PAYMENT.SET_WALLET_LIST, res.walletList);
  // },
  // async updatePaymentSettings({ commit }, payload) {
  //   const res = await this.$api.paymentService.sendPaymentSettings(payload);
  //   commit(PAYMENT.SET_NETWORKS, res.networks);
  //   return res.networks;
  // },
  // resetPaymentSettings({ commit }) {
  //   commit(PAYMENT.SET_NETWORKS, INIT_NETWORKS_VALUE);
  //   commit(PAYMENT.SET_NETWORK_LIST, []);
  // },
};

export default actions;
