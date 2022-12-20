import BigNumber from 'bignumber.js';
import type { AbiItem } from 'web3-utils';
import ConnectionWeb3 from '~/core/ConnectionWeb3';
import Web3 from 'web3';
import { ISignature } from '~/types/core';

BigNumber.config({ EXPONENTIAL_AT: 60 });

export interface ICustomError extends Error {
  ok: boolean,
  code: number
}

export interface IHelpersArgs {
  address: string,
  method: string,
  params?: Array<any>
  abi: AbiItem[]
}

export interface ITransactionPayload {
  from: string,
  to: string,
  value: string | number
}

export const error = (code: number, msg?: string, _err?: any): void => {
  const err: ICustomError = _err ?? new Error(msg ?? 'custom error');
  err.ok = false;
  err.code = code;

  throw err;
};

export const createContractAnonInstance = (abi: Array<AbiItem>, address: string): any => {
  const connection = ConnectionWeb3.getInstance();
  if (!connection.web3Guest) {
    throw new Error('anonymous web3 connection not initizlized');
  }
  return new connection.web3Guest.eth.Contract(abi, address);
};

export const createContractWalletInstance = (abi: Array<AbiItem>, address: string): any => {
  const connection = ConnectionWeb3.getInstance();

  if (!connection.web3Wallet) {
    throw new Error('wallet web3 connection not initizlized');
  }
  return new connection.web3Wallet.eth.Contract(abi, address);
};

// receives data from the contract using an anonymous provider
export const fetchContractData = async ({
  address, method, params, abi,
}: IHelpersArgs): Promise<any> => {
  const instance : any = createContractAnonInstance(abi, address);
  const tx = await instance.methods[method].apply(null, params).call();
  return tx;
};

// receives data from the contract using an wallet provider
export const fetchContractDataByWallet = async ({
  address, method, params, abi,
}: IHelpersArgs): Promise<any> => {
  const instance : any = createContractWalletInstance(abi, address);
  const tx = await instance.methods[method].apply(null, params).call();
  return tx;
};

// function to call the contract method and send data
export const sendDataToContract = async ({
  address, method, params, abi,
}: IHelpersArgs, userAddress: string): Promise<any> => {
  const instance : any = createContractWalletInstance(abi, address);
  const tx = await instance.methods[method].apply(null, params).send({ from: userAddress });
  return tx;
};

export const sendTransaction = async ({ from, to, value }: ITransactionPayload): Promise<any> => {
  const connection = ConnectionWeb3.getInstance();
  const tx = await connection.web3Wallet.eth.sendTransaction({ from, to, value });
  return tx;
};

// calculates the cost of a transaction
export const getFee = async ({
  address, method, params, abi,
}: IHelpersArgs, userAddress: string): Promise<string> => {
  const contract: any = createContractWalletInstance(abi, address);
  const connection = ConnectionWeb3.getInstance();
  const [
    gasPrice,
    estimateGas,
  ] = await Promise.all([
    connection.web3Guest.eth.getGasPrice(),
    contract.methods[method].apply(null, params).estimateGas({ from: userAddress }),
  ]);

  return connection.web3Guest.utils.fromWei(new BigNumber(gasPrice)
    .multipliedBy(estimateGas).toFixed());
};

// returns the balance of the native network token
export const getBalanceNativeToken = async (userAddress: string): Promise<string> => {
  const { web3Wallet } = ConnectionWeb3.getInstance();
  const balance = await web3Wallet.eth.getBalance(userAddress);
  return balance;
};

// TODO: EVENTS
type eventPayload = { abi: AbiItem[], address: string, filter?: any }

export const subscribeToContractEvents = ({ abi, address }: eventPayload, cb: any): void => {
  if (!address) {
    throw new Error('address is required and cannot be empty');
  }

  const instance = createContractWalletInstance(abi, address);
  // const filter = {
  //   sender: [userAddress]
  // }

  instance.events.allEvents({}, (err: any, data: any) => {
    console.log('err, data: ', err, data);
    cb(data);
  });
};

export const signData = async (web3: Web3, message: string, userAddress: string):
  Promise<ISignature> => {
  if (!message || !web3) {
    throw error(400, 'signData fails, required arguments not received');
  }
  let signature;
  const messageHash = web3.utils.soliditySha3(message);
  if (messageHash) {
    signature = await web3.eth.sign(messageHash, userAddress);
    return ({
      signature,
      messageHash,
    });
  }
  throw error(400, `signData fails, no message hash was returned on soliditySha3,
                               check message for sign or constant config file`);
};
