import { NETWORKS_SHORT_NAMES } from '~/utils/constants';

export const methodSwitchRpcEth = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x1',
  }],
};

export const methodSwitchRpcBscTestnet = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x61',
  }],
};

export const methodSwitchRpcBsc = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x38',
  }],
};

export const methodSwitchRpcMaticTestnet = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x13881',
  }],
};

export const methodSwitchRpcMatic = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x89',
  }],
};

export const methodSwitchRpcEthRinkeby = {
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x4' }],
};

export const methodAddRpcBscTestnet = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x61',
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  }],
};

export const methodAddRpcBsc = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  }],
};

export const methodAddRpcMaticTestnet = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18,
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  }],
};

export const methodAddRpcMatic = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com'],
  }],
};

export const methodAddRpcAvalanche = {
  method: 'wallet_addEthereumChain',
  params: [
    {
      chainId: '0xA86A',
      chainName: 'Avalanche Mainnet C-Chain',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://snowtrace.io/'],
    },
  ],
};

export const methodAddRpcAvalancheTestnet = {
  method: 'wallet_addEthereumChain',
  params: [
    {
      chainId: '0xA869',
      chainName: 'Avalanche Testnet C-Chain',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://testnet.snowtrace.io/'],
    },
  ],
};

export const methodSwitchRpcAvalanche = {
  method: 'wallet_switchEthereumChain',
  params: [
    {
      chainId: '0xA86A',
    },
  ],
};

export const methodSwitchRpcAvalancheTestnet = {
  method: 'wallet_switchEthereumChain',
  params: [
    {
      chainId: '0xA869',
    },
  ],
};

export const networksChainsConfig = {
  [NETWORKS_SHORT_NAMES.ETH]: {
    testnet: {
      switchChain: methodSwitchRpcEthRinkeby,
    },
    mainnet: {
      switchChain: methodSwitchRpcEth,
    },
  },
  [NETWORKS_SHORT_NAMES.BSC]: {
    testnet: {
      switchChain: methodSwitchRpcBscTestnet,
      addChain: methodAddRpcBscTestnet,
    },
    mainnet: {
      switchChain: methodSwitchRpcBsc,
      addChain: methodAddRpcBsc,
    },
  },
  [NETWORKS_SHORT_NAMES.POLYGON]: {
    testnet: {
      switchChain: methodSwitchRpcMaticTestnet,
      addChain: methodAddRpcMaticTestnet,
    },
    mainnet: {
      switchChain: methodSwitchRpcMatic,
      addChain: methodAddRpcMatic,
    },
  },
  [NETWORKS_SHORT_NAMES.AVAX]: {
    testnet: {
      switchChain: methodSwitchRpcAvalancheTestnet,
      addChain: methodAddRpcAvalancheTestnet,
    },
    mainnet: {
      switchChain: methodSwitchRpcAvalanche,
      addChain: methodAddRpcAvalanche,
    },
  },
};
