import type { ActionTree } from 'vuex';
import Bridge from '~/core/contracts/Bridge';
import { IRootState } from '~/types/store';
import { IBridgeState } from '~/types/store/bridge';

const actions: ActionTree<IBridgeState, IRootState> = {
  async sendSwap({ rootGetters }, { recipient, amount }) {
    const contract = new Bridge({ address: process.env.BRIDGE as string });
    await contract.swapToken(
      [
        rootGetters['web3/getTokensMap'][process.env.ETH_TOKEN as string].symbol,
        '2',
        recipient,
        amount],
      rootGetters['web3/getUserAddress'],
    );
  },
  async claim({ rootGetters }, payload) {
    console.log(payload);
    const contract = new Bridge({ address: process.env.BRIDGE as string });
    await contract.claim(payload, rootGetters['web3/getUserAddress']);
  },
};

export default actions;
