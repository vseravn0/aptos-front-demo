import httpClient from '~/api/httpClient';
import { APTOS_COIN_HEADERS, APTOS_COIN_MODULES, APTOS_COIN_STRUCTURE } from '~/utils/constants';

const { APT_TOKEN } = process.env;

// example how to use node api request for get data

export interface IAptosService {
  getUserBalance: (userAddress:string) => Promise<Record<string, string>>
  getTokenData: () => Promise<void>
  getNonce: (userAddress:string) => Promise<string>
  getGasPrice: () => Promise<string>
}

const getUserBalance = async (userAddress:string): Promise<any> => {
  const { data: { coin: { value } } } = await httpClient.$get(`accounts/${userAddress}/resource/${APTOS_COIN_HEADERS.COIN_STORE}<${APT_TOKEN}::${APTOS_COIN_MODULES.SUPPORTED_TOKENS}::${APTOS_COIN_STRUCTURE.USDT}>`);
  return value;
};

const getTokenData = async (): Promise<void> => {
  const { data } = await httpClient.$get(`accounts/${APT_TOKEN}/resource/${APTOS_COIN_HEADERS.COIN_STORE}<${APT_TOKEN}::${APTOS_COIN_MODULES.SUPPORTED_TOKENS}::${APTOS_COIN_STRUCTURE.USDT}>`);
  return data;
};

const getNonce = async (userAddress:string): Promise<string> => {
  // eslint-disable-next-line camelcase
  const { sequence_number } = await httpClient.$get(`accounts/${userAddress}`);
  // eslint-disable-next-line camelcase
  return sequence_number;
};

const getGasPrice = async (): Promise<string> => {
  // eslint-disable-next-line camelcase
  const { gas_estimate } = await httpClient.$get('estimate_gas_price');
  // eslint-disable-next-line camelcase
  return gas_estimate;
};

export default {
  getUserBalance,
  getTokenData,
  getNonce,
  getGasPrice,
} as IAptosService;
