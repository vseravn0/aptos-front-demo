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
  COIN_STORE = '0x1::coin::CoinStore',
  COIN_INFO = '0x1::coin::CoinInfo',
  COIN_SUPPORTED = '::SupportedTokens::USDT'
}

export const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
export const FAUCET_URL = process.env.APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com';
export const APT_TOKEN = process.env.APTOS_TOKEN || '0x06d6080cb1ecadb865b6cc88c040d27373637119e1f1697ffe99375e9de12513';
// const { APT_TOKEN } = process.env;

// export const APTOS_API_METHODS_PAYLOAD = {
//   GET_USER_BALANCE: `<${APT_TOKEN}::SupportedTokens::USDT>`,
//   GET_BALANCE: `<${APT_TOKEN}::CoinInfo::USDT>`,
// };
