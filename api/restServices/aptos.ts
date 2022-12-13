import httpClient from '~/api/httpClient';

const { APT_TOKEN } = process.env;

export interface IAptosService {
  getUserBalance: (userAddress:string) => Promise<any>
  getTokenData: () => Promise<void>
  getNonce: (userAddress:string) => Promise<string>
  getGasPrice: () => Promise<string>
  sendTokenBridge: ({ payload, signature }:any) => Promise<any>
}

const getUserBalance = async (userAddress:string): Promise<any> => {
  const { data: { coin: { value } } } = await httpClient.$get(`accounts/${userAddress}/resource/0x1::coin::CoinStore<${APT_TOKEN}::SupportedTokens::USDT>`);
  return value;
};

const getTokenData = async (): Promise<void> => {
  const { data } = await httpClient.$get(`accounts/${APT_TOKEN}/resource/0x1::coin::CoinInfo<${APT_TOKEN}::SupportedTokens::USDT>`);
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

const sendTokenBridge = async (payload:any): Promise<void> => {
  const res = await httpClient.$post('/transactions', { ...payload });
  console.log(res);
};

export default {
  getUserBalance,
  getTokenData,
  getNonce,
  getGasPrice,
  sendTokenBridge,
} as IAptosService;
