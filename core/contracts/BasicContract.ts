import type { AbiItem } from 'web3-utils';
import { IContractsManager } from '~/plugins/contractsManager';
import {
  createContractAnonInstance,
  createContractWalletInstance,
  getFee,
  error,
} from '~/core/helpers';
import BigNumber from 'bignumber.js';

interface IEventOptions {
  filter?: any,
  fromBlock?: number|string|BigNumber,
  topics?: any[]
}

let contractsManager: IContractsManager;

export const setContractsManagerInstance = (instance: IContractsManager): void => {
  contractsManager = instance;
};

export default class BasicContract {
  [key: string]: any;
  address: string
  abi: AbiItem[]

  constructor({ address, abi }: { address: string; abi: Array<AbiItem>; }) {
    this.address = address;
    this.abi = abi;
  }

  createContractAnonInstance(): any {
    return createContractAnonInstance(this.abi, this.address);
  }

  createContractWalletInstance(): any {
    return createContractWalletInstance(this.abi, this.address);
  }

  getAnonInstance(): any {
    if (!contractsManager.anonContractsMap[this.address]) {
      contractsManager.addContractToAnonMap(
        this.address,
        this.createContractAnonInstance(),
      );
    }

    return contractsManager.anonContractsMap[this.address];
  }

  getWalletInstance(): any {
    if (!contractsManager.walletContractsMap[this.address]) {
      contractsManager.addContractToWalletMap(
        this.address,
        this.createContractWalletInstance(),
      );
    }

    return contractsManager.walletContractsMap[this.address];
  }

  async fetchContractData(method: string, params?: Array<string>): Promise<any> {
    try {
      const contract = this.getAnonInstance();
      return await contract.methods[method].apply(this, params).call();
    } catch (err) {
      throw error(500, 'fetch contract error', err);
    }
  }

  async fetchContractDataByWallet(method: string, params?: Array<string>): Promise<any> {
    try {
      const contract = this.getWalletInstance();
      return await contract.methods[method].apply(this, params).call();
    } catch (err) {
      throw error(500, 'fetch contract error', err);
    }
  }

  async sendDataToContract(
    method: string,
    params: Array<string>,
    userAddress: string,
  ): Promise<any> {
    try {
      const instance: any = this.getWalletInstance();
      return await instance.methods[method].apply(this, params).send({ from: userAddress });
    } catch (err) {
      throw error(400, 'contract error', err);
    }
  }

  async getFee(method: string, params: Array<any>, userAddress: string): Promise<string> {
    return await getFee({
      address: this.address, method, params, abi: this.abi,
    }, userAddress);
  }

  subscribeToContractEvents(
    cb: (...args: any) => void,
    eventName: string,
    options: IEventOptions = {},
  ): void {
    const instance = this.createContractWalletInstance();
    // const filter = {
    //   sender: [userAddress]
    // }

    instance.events[eventName](options, (err: any, data: any) => {
      cb(data);
    });
  }
}
