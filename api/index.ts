import { setHTTPClientInstance } from './httpClient';
import tokenService, { ITokenSevice } from './restServices/token';

export interface IApiService {
  tokenService: ITokenSevice
}

export default {
  tokenService,
} as IApiService;

export {
  setHTTPClientInstance,
};
