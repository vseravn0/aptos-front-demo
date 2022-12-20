import { NETWORKS_SHORT_NAMES } from '~/utils/constants';

export const methodSwitchRpcEth = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x1',
  }],
};

export const methodSwitchRpcEthSepolia = {
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xAA36A7' }],
};

export const networksChainsConfig = {
  [NETWORKS_SHORT_NAMES.ETH]: {
    testnet: {
      switchChain: methodSwitchRpcEthSepolia,
    },
    mainnet: {
      switchChain: methodSwitchRpcEth,
    },
  },
};
