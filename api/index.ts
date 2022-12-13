import { setHTTPClientInstance } from './httpClient';
import aptosService, { IAptosService } from './restServices/aptos';

export interface IApiService {
  aptosService: IAptosService
}

export default {
  aptosService,
} as IApiService;

export {
  setHTTPClientInstance,
};
