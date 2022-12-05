import Token, {ITransaction} from "~/core/contracts/Token";

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
