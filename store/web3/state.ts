import { NETWORKS_MAINNET, NETWORKS_TESTNET } from '~/utils/constants';
import {IWeb3V2State} from "~/types/store/web3";

export const initState = (): IWeb3V2State => ({
  isConnected: false,
  chainId: process.env.IS_MAINNET === 'false' ? NETWORKS_TESTNET.ETH : NETWORKS_MAINNET.ETH,
  userAddress: '',
  tokensMap: {},
  transactionsMap: {},
});

export default initState;
