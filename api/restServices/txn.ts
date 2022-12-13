import httpClient from '~/api/httpClient';

export interface ITxnService {
  getUserTxns: (userAddress:string) => Promise<any>
  getSignature: (id: string) => Promise<any>
}

const getUserTxns = async (userAddress:string): Promise<any> => {
  const txns = await httpClient.$get(`https://localhost:3000/receipts/${userAddress}`);
  return txns;
};

const getSignature = async (id: string): Promise<any> => {
  const signature = await httpClient.$get(`https://localhost:3000/signature/${id}`);
  return signature;
};

export default {
  getUserTxns,
  getSignature,
} as ITxnService;
