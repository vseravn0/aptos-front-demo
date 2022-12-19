export const NETWORKS_SHORT_NAMES = {
  ETH: 'ETH',
  APT: 'APT',
};

export const NETWORKS_TESTNET = {
  [NETWORKS_SHORT_NAMES.ETH]: 11155111,
  11155111: NETWORKS_SHORT_NAMES.ETH,
};

export const NETWORKS_MAINNET = {
  [NETWORKS_SHORT_NAMES.ETH]: 11155111,
  11155111: NETWORKS_SHORT_NAMES.ETH,
};

export const APTOS_NETWORK_TESTNET = {
  [NETWORKS_SHORT_NAMES.APT]: 2,
  2: [NETWORKS_SHORT_NAMES.APT],
};

export const APTOS_NETWORK_MAINNET = {
  [NETWORKS_SHORT_NAMES.APT]: 1,
  1: [NETWORKS_SHORT_NAMES.APT],
};

export type AnonProviders = {
  [key: number]: string
}
export const ANON_PROVIDERS_TESTNET: AnonProviders = {
  [NETWORKS_TESTNET.ETH]: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
};

export const ANON_PROVIDERS_MAINNET: AnonProviders = {
  [NETWORKS_MAINNET.ETH]: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
};

export const MESSAGE_FOR_SIGN = {
  USER_DATA: 'Hi, this signature is required to receive and display data such as: payment sittings',
};

export enum BRIDGE_CONTRACT_METHODS {
  SWAP = 'send',
  CLAIM = 'claim'
}

export enum MODALS_KEY {
  CONNECT_WALLET = 'connect_wallet'
}

export enum APTOS_COIN_HEADERS {
  // CoinStore gives user balance
  COIN_STORE = '0x1::coin::CoinStore',
  // CoinStore gives token decimal,symbol and etc
  COIN_INFO = '0x1::coin::CoinInfo',
}

export enum APTOS_COIN_MODULES {
  SUPPORTED_TOKENS = 'SupportedTokens',
  BRIDGE = 'Bridge'
}

export enum APTOS_COIN_STRUCTURE {
  USDT = 'USDT',
  CLAIM = 'claim',
  SEND = 'send'
}

export enum APTOS_NETWORK {
  TESTNET = 'Testnet',
  MAINNET = 'Mainnet',
  DEVNET = 'Devnet',
}

export const APTOS_NODE_URL = process.env.IS_MAINNET === 'true' ? 'https://fullnode.mainnet.aptoslabs.com/v1/' : 'https://fullnode.testnet.aptoslabs.com/v1/';
