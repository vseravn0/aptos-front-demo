import Web3 from 'web3';
import { error } from '~/core/helpers';
import {
  ANON_PROVIDERS_MAINNET, ANON_PROVIDERS_TESTNET, NETWORKS_MAINNET, NETWORKS_TESTNET,
} from '~/utils/constants';
import {
  networksChainsConfig,
} from '~/core/configs/configChainRpc';

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
  isConnected = false
  userAddress = ''

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
    const providersUrl = JSON.parse(`${process.env.IS_MAINNET}`) ? ANON_PROVIDERS_MAINNET : ANON_PROVIDERS_TESTNET;

    const provider = new Web3.providers.HttpProvider(providersUrl[chainId]);
    this.web3Guest = new Web3(provider);
  }

  // Подключение к кошельку metamask/coinbase
  public async connectWallet(defaultChain: number, type = 'metamask') : Promise<void> {
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

      if (this.chainId !== defaultChain) {
        await this.changeCurrentMMChain(defaultChain, type);
      }
    } catch (err) {
      console.log('CONNECTION ERR: ', err);
      this.disconnect();
    }
  }

  // Переключение сетей в метамаске с использованием api метамаска
  public async changeCurrentMMChain(tragetChainID: number, type = 'metamask'): Promise<any> {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type);
    const isMainnet = process.env.IS_MAINNET === 'true';
    const blockchainName = isMainnet
      ? NETWORKS_MAINNET[tragetChainID]
      : NETWORKS_TESTNET[tragetChainID];

    // сигнатура для метода переключения сети в метамаске
    const switchRpcMethod = isMainnet
      ? networksChainsConfig[blockchainName].mainnet.switchChain
      : networksChainsConfig[blockchainName].testnet.switchChain;
    // сигнатура для метода добавления сети в метамаск
    const addRpcMethod = isMainnet
      ? networksChainsConfig[blockchainName].mainnet.addChain
      : networksChainsConfig[blockchainName].testnet.addChain;

    if (this.chainId !== +tragetChainID) {
      try {
        await currentProvider.request(switchRpcMethod);
      } catch (switchError) {
        if ((switchError as ProviderRpcError).code === 4902) {
          try {
            await currentProvider.request(addRpcMethod);
          } catch (addError) {
            throw error(400, 'chain connection error');
          }
        }

        if ((switchError as ProviderRpcError).code === 4001) {
          throw error(4001, 'user denied transaction');
        }

        if (!addRpcMethod) {
          throw error(400, 'chain connection error');
        }
      }
    }

    this.chainId = await this.web3Wallet.eth.net.getId();
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
  private disconnect = (type = 'metamask'): void => {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type);

    currentProvider.removeListener('chainChanged', this.handleChainChanged);
    currentProvider.removeListener('accountsChanged', this.handleAccountsChanged);
    store.commit('web3/DISCONNECT_WALLET');
  }

  // функция обработчик для ивента переключения сети chainChanged
  // Должна быть стрелочной функцией воизбежание потери this
  private handleChainChanged = (chainId: string, type = 'metamask'): void => {
    console.log('handleChainChanged chainId: ', chainId);
    const { IS_MAINNET } = process.env;
    if (+chainId !== this.chainId) {
      if ((IS_MAINNET === 'false' && NETWORKS_TESTNET[+chainId]) || (IS_MAINNET === 'true' && NETWORKS_MAINNET[+chainId])) {
        this.chainId = +chainId;
        store.commit('web3/SET_CHAIN_ID', +chainId);
        // await this.connectWallet(chainId)
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
}
