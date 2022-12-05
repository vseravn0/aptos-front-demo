import type { Context } from '@nuxt/types';
import type { Inject } from '@nuxt/types/app';
import { setContractsManagerInstance } from '~/core/contracts/BasicContract';

export interface IContractsManager {
  anonContractsMap: Record<string, any>,
  walletContractsMap: Record<string, any>,
  addContractToAnonMap: (address: string, instance: any) => void,
  addContractToWalletMap: (address: string, instance: any) => void,
  clearAnonContractsMap: () => void,
  clearWalletContractsMap: () => void
}

export default (ctx: Context, inject: Inject): void => {
  const contractsManager: IContractsManager = {
    anonContractsMap: {},
    walletContractsMap: {},
    addContractToAnonMap(address: string, instance: any): void {
      this.anonContractsMap[address] = instance;
    },
    addContractToWalletMap(address: string, instance: any): void {
      this.walletContractsMap[address] = instance;
    },
    clearAnonContractsMap() {
      this.anonContractsMap = {};
    },
    clearWalletContractsMap() {
      this.walletContractsMap = {};
    },
  };

  inject('contractsManager', contractsManager);
  setContractsManagerInstance(contractsManager);
};
