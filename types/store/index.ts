import { IWeb3V2State } from '~/types/store/web3';
import { IBridgeState } from '~/types/store/bridge';
import { IAptosState } from '~/types/store/aptos';

export interface IRootState {
  web3: IWeb3V2State;
  bridge: IBridgeState;
  aptos: IAptosState;
}
