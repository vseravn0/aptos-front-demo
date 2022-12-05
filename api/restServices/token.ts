import httpClient from '~/api/httpClient';

export interface ITokenSevice {
  getEthCost: () => Promise<number>
}

const getEthCost = async (): Promise<any> => {
  const params = { ids: 'ethereum', vs_currencies: 'usd' };
  const resp = await httpClient.$get('simple/price', { params });

  return resp.ethereum.usd;
};

export default {
  getEthCost,
} as ITokenSevice;
