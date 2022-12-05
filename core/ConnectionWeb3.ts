import Web3 from 'web3';
import {
  error,
  signData,
} from '~/core/helpers';
import {
  ANON_PROVIDERS_MAINNET,
  ANON_PROVIDERS_TESTNET,
  MESSAGE_FOR_SIGN,
  NETWORKS_MAINNET,
  NETWORKS_TESTNET,
} from '~/utils/constants';
import {
  networksChainsConfig,
} from '~/core/configs/configChainRpc';
import { ISignature } from '~/types/core';

declare global {
  interface Window {
    ethereum?: any
    onNuxtReady?: any
  }
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: any;
}

export enum PROVIDER_INSTALL_ERROR {
  NO_ANY_WALLET = 460,
  NO_METAMASK = 461,
  NO_COINBASE = 462,
}

export enum CHAINS_ERROR {
  SWITCH_DENIED = 4001,
  ADD_CHAIN_DENIED = 4002,
  CHAIN_NOT_EXIST = 4902,
  CANT_ADD_CHAIN = 4003,
}

let store: any;

if (process.browser) {
  window.onNuxtReady((ctx: any) => {
    store = ctx.$store;
  });
}

export default class ConnectionWeb3 {
  private static _instance: ConnectionWeb3;
  web3Guest: any = null
  web3Wallet: any = null
  chainId: number | null = null
  anonChainId: number | null = null
  isConnected = false
  userAddress = ''
  supportedChainMap = null as any

  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {
    if (ConnectionWeb3._instance) {
      throw new Error('Error - use Singleton.getInstance()');
    }
  }

  // Метод для создания инстанса в единственном экзмеляре (паттерн Singleton)
  public static getInstance(): ConnectionWeb3 {
    if (!ConnectionWeb3._instance) {
      ConnectionWeb3._instance = new ConnectionWeb3();
    }

    return ConnectionWeb3._instance;
  }

  // Метод для анонимного подключения к ноде
  public connectAnonProvider(chainId: number): void {
    this.anonChainId = chainId;

    const providersUrl = JSON.parse(`${process.env.IS_MAINNET}`) ? ANON_PROVIDERS_MAINNET : ANON_PROVIDERS_TESTNET;

    const provider = new Web3.providers.HttpProvider(providersUrl[chainId]);

    this.web3Guest = new Web3(provider);
  }

  // Подключение к кошельку metamask/coinbase
  public async connectWallet(defaultChain: number, type = 'metamask', supportedChainMap = null) : Promise<void> {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type);

    try {
      // unsubscribe to metamask events
      currentProvider.removeListener('chainChanged', this.handleChainChanged);
      currentProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      // subscribe to metamask events
      currentProvider.on('chainChanged', this.handleChainChanged);
      currentProvider.on('accountsChanged', this.handleAccountsChanged);

      this.web3Wallet = new Web3(currentProvider); // init web3

      if (currentProvider.isConnected()) { // is metamask connected
        await currentProvider.enable(); // connect provider wallet
      }

      // get chain id and user address
      [this.userAddress, this.chainId] = await Promise.all([
        this.web3Wallet.eth.getCoinbase(),
        this.web3Wallet.eth.net.getId(),
      ]);
      this.isConnected = true;

      const isMainnet = process.env.IS_MAINNET === 'true';
      if (supportedChainMap) {
        this.supportedChainMap = supportedChainMap;
      } else {
        this.supportedChainMap = isMainnet ? NETWORKS_MAINNET : NETWORKS_TESTNET;
      }

      if (this.chainId !== defaultChain) {
        this.chainId = await this.changeCurrentMMChain(defaultChain, type);
      }
    } catch (err) {
      console.log('CONNECTION ERR: ', err);
      this.disconnect();
      throw err;
    }
  }

  // Переключение сетей в метамаске с использованием api метамаска
  public async changeCurrentMMChain(tragetChainID: number, type = 'metamask'): Promise<number | null> {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type);
    const isMainnet = process.env.IS_MAINNET === 'true';
    const blockchainName = this.supportedChainMap[tragetChainID];
    // сигнатура для метода переключения сети в метамаске
    const switchRpcMethod = isMainnet
      ? networksChainsConfig[blockchainName].mainnet.switchChain
      : networksChainsConfig[blockchainName].testnet.switchChain;
    // сигнатура для метода добавления сети в метамаск
    const addRpcMethod = isMainnet
      ? networksChainsConfig[blockchainName].mainnet.addChain
      : networksChainsConfig[blockchainName].testnet.addChain;
    if (this.chainId !== tragetChainID) {
      try {
        await currentProvider.request(switchRpcMethod);
      } catch (switchError) {
        if ((switchError as ProviderRpcError).code === CHAINS_ERROR.CHAIN_NOT_EXIST) {
          try {
            await currentProvider.request(addRpcMethod);
          } catch (addError) {
            throw error(CHAINS_ERROR.ADD_CHAIN_DENIED, 'chain connection error', addError);
          }
        }

        if ((switchError as ProviderRpcError).code === CHAINS_ERROR.SWITCH_DENIED) {
          throw error(CHAINS_ERROR.SWITCH_DENIED, 'user denied transaction', switchError);
        }

        if (!addRpcMethod) {
          throw error(CHAINS_ERROR.CANT_ADD_CHAIN, 'chain connection error');
        }
      }
    }

    return await this.web3Wallet.eth.net.getId();
  }

  private static getEthereumProvider(type: string): any {
    const { ethereum } = window;

    let currentProvider = null;

    if (ethereum) {
      if (ethereum.providers && ethereum.providers.length) {
        if (type === 'metamask') {
          currentProvider = ethereum.providers?.find((provider: any) => provider.isMetaMask);
          if (!currentProvider) {
            throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask');
          }
        } else if (type === 'coinbase') {
          currentProvider = ethereum.providers?.find((provider: any) => provider.isCoinbaseWallet);
          if (!currentProvider) {
            throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase');
          }
        }
      } else if ((ethereum.isMetaMask && type === 'metamask') || (ethereum.isCoinbaseWallet && type === 'coinbase')) {
        currentProvider = ethereum;
      } else if (!ethereum.isMetaMask && type === 'metamask') {
        throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask');
      } else if (!ethereum.isCoinbaseWallet && type === 'coinbase') {
        throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase');
      }
    } else {
      if (type === 'metamask') {
        throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask');
      }
      if (type === 'coinbase') {
        throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase');
      }
    }

    if (!currentProvider) {
      throw error(PROVIDER_INSTALL_ERROR.NO_ANY_WALLET, 'no wallet');
    }

    return currentProvider;
  }

  // отписка от ивентов метамаска
  private clearListeners = (type = 'metamask'): void => {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type);
    currentProvider.removeListener('chainChanged', this.handleChainChanged);
    currentProvider.removeListener('accountsChanged', this.handleAccountsChanged);
  }

  // функция обработчик для ивента переключения сети chainChanged
  // Должна быть стрелочной функцией воизбежание потери this
  private handleChainChanged = (chainId: string, type = 'metamask'): void => {
    console.log('handleChainChanged chainId: ', +chainId);
    console.log('this.chainId: ', this.chainId, this);
    if (+chainId !== this.chainId) {
      if (this.supportedChainMap[+chainId]) {
        this.chainId = +chainId;
        this.anonChainId = +chainId;
        store.commit('web3/SET_CHAIN_ID', +chainId);
        store.dispatch('web3/connectNode', +chainId);
      } else {
        /* Здесь можно дать юзеру выбрать оставаться в неподдерживаемой сети
          или же вернуться на какую то из поддерживаемых. Если выбирает остаться в неподдерживаемой
          то отключиться (this.disconnect) и удалить данные, иначе переключиться на другую сеть
        */
        this.disconnect(type);
        console.warn('THIS NETWORK NOT SUPPORTED');
      }
    }
  }

  // функция обработчик для ивента переключения счета/аккаунта accountsChanged.
  // Должна быть стрелочной функцией воизбежание потери this
  private handleAccountsChanged = (account: Array<string>): void => {
    console.log('account: ', account, 'this', this);
    if (account.length) {
      [this.userAddress] = account;
      store.commit('web3/SET_USER_ADDRESS', this.userAddress);
    } else {
      this.disconnect();
    }
  }

  public disconnect(type = 'metamask'): void {
    this.chainId = null;
    this.userAddress = '';
    this.isConnected = false;
    this.web3Wallet = null;
    this.clearListeners(type);
    store.commit('web3/DISCONNECT_WALLET');
  }

  public async getSignature(): Promise<ISignature> {
    const msg = MESSAGE_FOR_SIGN.USER_DATA;
    if (!this.web3Wallet) {
      throw error(400, 'Connect wallet first');
    }
    try {
      const { messageHash, signature } = await signData(this.web3Wallet, msg, this.userAddress);
      return ({ messageHash, signature });
    } catch (e) {
      this.disconnect();
      throw e;
    }
  }
}
