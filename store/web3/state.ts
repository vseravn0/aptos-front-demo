import Token, { ITransaction } from '~/core/contracts/Token';
import { NETWORKS_MAINNET, NETWORKS_TESTNET } from '~/utils/constants';

export interface ITokensMap {
  [key: string]: Token;
}

export interface ITransactionsMap {
  [key: string]: ITransaction
}

export interface IWeb3V2State {
  isConnected: boolean,
  chainId: number | string | null,
  userAddress: string,
  tokensMap: ITokensMap,
  transactionsMap: any
}

export const initState = (): IWeb3V2State => ({
  isConnected: false,
  chainId: process.env.IS_MAINNET === 'false' ? NETWORKS_TESTNET.ETH : NETWORKS_MAINNET.ETH,
  userAddress: '',
  tokensMap: {},
  transactionsMap: {},
});

export default initState;
