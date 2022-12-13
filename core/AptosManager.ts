import {
  AptosClient, MaybeHexString,
} from 'aptos';
import { APTOS_COIN_HEADERS } from '~/utils/constants';

export default class AptosManager extends AptosClient {
  constructor() {
    super(process.env.APTOS_NODE_URL as string);
  }

  async getTokenData(coinTypeAddress:MaybeHexString):Promise<any | string> {
    try {
      // @ts-ignore
      const { data: { decimals, name, symbol } } = await this.getAccountResource(
        coinTypeAddress,
        `${APTOS_COIN_HEADERS.COIN_INFO}<${coinTypeAddress + APTOS_COIN_HEADERS.COIN_SUPPORTED}>`,
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
        `${APTOS_COIN_HEADERS.COIN_STORE}<${coinTypeAddress + APTOS_COIN_HEADERS.COIN_SUPPORTED}>`,
      );
      return parseInt((resource.data as any).coin.value, 10);
    } catch (e) {
      const errMsg = `getBalance error: ${e}`;
      console.log(errMsg);
      return errMsg;
    }
  }
}
