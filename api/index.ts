import txnService, { ITxnService } from '~/api/restServices/txn';
import { setHTTPClientInstance } from './httpClient';
import aptosService, { IAptosService } from './restServices/aptos';

export interface IApiService {
  aptosService: IAptosService,
  txnService: ITxnService
}

export default {
  aptosService,
  txnService,
} as IApiService;

export {
  setHTTPClientInstance,
};
