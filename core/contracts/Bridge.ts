import BasicContract from '~/core/contracts/BasicContract';
import bridge from '~/core/abis/bridge';
import { BRIDGE_CONTRACT_METHODS } from '~/utils/constants';

export default class Bridge extends BasicContract {
  constructor({ address }:{address:string}) {
    super({
      address,
      abi: bridge,
    });
  }

  async swapToken(
    params: string[],
    userAddress: string,
  ): Promise<any> {
    console.log(params, userAddress);
    return await super.sendDataToContract(
      BRIDGE_CONTRACT_METHODS.SWAP,
      params,
      userAddress,
    );
  }

  async claim(
    params: string[],
    userAddress: string,
  ): Promise<any> {
    return await super.sendDataToContract(
      BRIDGE_CONTRACT_METHODS.CLAIM,
      params,
      userAddress,
    );
  }
}
