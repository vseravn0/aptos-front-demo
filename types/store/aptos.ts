export interface IUserData {
  publicKey: string,
  address: string,
}

export interface IAptosState {
  isConnected: boolean,
  userBalance: string,
  chainId: number | string | null,
  tokenData: any,
  nonce: string,
  gasPrice: string,
  signature: string,
  userData: IUserData,
}
