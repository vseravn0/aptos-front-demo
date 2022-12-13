import { IAptosState } from '~/types/store/aptos';
import { APTOS_NETWORK_MAINNET, APTOS_NETWORK_TESTNET } from '~/utils/constants';

export const initUserDataState = {
  publicKey: '',
  address: '',
};

export const initState = (): IAptosState => ({
  isConnected: false,
  userData: initUserDataState,
  // @ts-ignore
  chainId: process.env.IS_MAINNET === 'false' ? APTOS_NETWORK_TESTNET.APT : APTOS_NETWORK_MAINNET.APT,
  userBalance: '',
  tokenData: {},
  gasPrice: '',
  nonce: '',
  signature: '',
});

export default initState;
