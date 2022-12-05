export const NETWORKS_SHORT_NAMES = {
  ETH: 'ETH',
  BSC: 'BSC',
  POLYGON: 'POLYGON',
};

export const NETWORKS_TESTNET = {
  [NETWORKS_SHORT_NAMES.ETH]: 4,
  [NETWORKS_SHORT_NAMES.BSC]: 97,
  [NETWORKS_SHORT_NAMES.POLYGON]: 80001,
  4: NETWORKS_SHORT_NAMES.ETH,
  97: NETWORKS_SHORT_NAMES.BSC,
  80001: NETWORKS_SHORT_NAMES.POLYGON,
};

export const NETWORKS_MAINNET = {
  [NETWORKS_SHORT_NAMES.ETH]: 1,
  [NETWORKS_SHORT_NAMES.BSC]: 56,
  [NETWORKS_SHORT_NAMES.POLYGON]: 137,
  1: NETWORKS_SHORT_NAMES.ETH,
  56: NETWORKS_SHORT_NAMES.BSC,
  137: NETWORKS_SHORT_NAMES.POLYGON,
};

export type AnonProviders = {
  [key: number]: string
}
export const ANON_PROVIDERS_TESTNET: AnonProviders = {
  [NETWORKS_TESTNET.ETH]: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  [NETWORKS_TESTNET.BSC]: 'https://data-seed-prebsc-1-s2.binance.org:8545',
  [NETWORKS_TESTNET.POLYGON]: 'https://matic-mumbai.chainstacklabs.com',
};

export const ANON_PROVIDERS_MAINNET: AnonProviders = {
  [NETWORKS_MAINNET.ETH]: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  [NETWORKS_MAINNET.BSC]: 'https://bsc-dataseed.binance.org',
  [NETWORKS_MAINNET.POLYGON]: 'https://polygon-rpc.com',
};
