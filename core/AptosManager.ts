import { AptosClient, MaybeHexString } from 'aptos';
import {
  APTOS_COIN_HEADERS, APTOS_COIN_MODULES, APTOS_COIN_STRUCTURE, APTOS_NETWORK,
  APTOS_NODE_URL,
} from '~/utils/constants';

declare global {
  interface Window { aptos: any; }
}

const { aptos } = window;
let store: any;

if (process.browser) {
  window.onNuxtReady((ctx: any) => {
    store = ctx.$store;
  });
}

const currentNetwork = process.env.IS_MAINNET === 'true' ? APTOS_NETWORK.MAINNET : APTOS_NETWORK.TESTNET;

// example how to use aptos sdk

export default class AptosManager extends AptosClient {
  userData: any = null
  isConnected = false
  getChainId: any
  constructor() {
    super(APTOS_NODE_URL);
  }

  async connectWallet():Promise<void> {
    try {
      this.userData = await aptos.connect();
      this.isConnected = await aptos.isConnected();
      this.getChainId = await aptos.network();
      if (this.getChainId !== currentNetwork) {
        aptos.disconnect();
      }
      this.setEventListener();
    } catch (e) {
      const errMsg = `connectWallet error: ${e}`;
      console.log(errMsg);
    }
  }

  private onNetworkChange():void {
    window.aptos.onNetworkChange((newNetwork) => {
      this.chainId = newNetwork;
      store.commit('aptos/SET_CHAIN_ID', newNetwork);
    });
  }

  private accountChanged():void {
    window.aptos.onAccountChange((newAccount) => {
      if (newAccount) {
        this.userData = newAccount;
        store.commit('aptos/SET_USER_DATA', newAccount);
      } else {
        this.isConnected = window.aptos.connect();
      }
    });
  }

  public async sendAndSubmitTnx(tnxPayload:Record<string, string>):Promise<void> {
    try {
      await aptos.signAndSubmitTransaction(tnxPayload);
    } catch (e) {
      console.log(e);
    }
  }

  public async signTnx(tnxPayload:Record<string, string>):Promise<void> {
    try {
      await aptos.signTransaction(tnxPayload);
    } catch (e) {
      console.log(e);
    }
  }

  public disconnect():void {
    aptos.disconnect();
    this.userData = '';
    this.isConnected = false;
    this.getChainId = '';
    store.commit('aptos/SET_USER_DATA', {});
    store.commit('aptos/SET_CHAIN_ID', '');
    store.commit('aptos/SET_IS_CONNECTED', false);
  }

  private disconnected():void {
    window.aptos.onDisconnect(() => {
      this.disconnect();
    });
  }

  private setEventListener():void {
    this.onNetworkChange();
    this.accountChanged();
    this.disconnected();
  }

  async getTokenData(coinTypeAddress:MaybeHexString):Promise<any | string> {
    try {
      // @ts-ignore
      const { data: { decimals, name, symbol } } = await this.getAccountResource(
        coinTypeAddress,
        `${APTOS_COIN_HEADERS.COIN_INFO}<${`${coinTypeAddress}::${APTOS_COIN_MODULES.SUPPORTED_TOKENS}::${APTOS_COIN_STRUCTURE.USDT}`}>`,
      );
      return { decimals, name, symbol };
    } catch (e) {
      const errMsg = `getTokenData error: ${e}`;
      console.log(errMsg);
      return errMsg;
    }
  }

  async getBalance(accountAddress: MaybeHexString, coinTypeAddress:MaybeHexString):
    Promise<string | number> {
    try {
      const resource = await this.getAccountResource(
        accountAddress,
        `${APTOS_COIN_HEADERS.COIN_STORE}<${`${coinTypeAddress}::${APTOS_COIN_MODULES.SUPPORTED_TOKENS}::${APTOS_COIN_STRUCTURE.USDT}`}>`,
      );
      return parseInt((resource.data as any).coin.value, 10);
    } catch (e) {
      const errMsg = `getBalance error: ${e}`;
      console.log(errMsg);
      return errMsg;
    }
  }
}
