import BigNumber from 'bignumber.js';
import BasicContract from '~/core/contracts/BasicContract';
import ERC20 from '~/core/abis/erc20';
import { shiftedBy } from '~/utils';
import { error } from '~/core/helpers';

export interface ITransaction {
  from: string,
  to: string,
  value: string,
  tokenAddress: string,
  transactionHash: string,
  type: string
}

export default class Token extends BasicContract {
  decimals = '0'
  symbol = ''
  name = ''
  balance = '0'

  constructor({ address }:{ address: string}) {
    super({
      address,
      abi: ERC20,
    });
  }

  async initAnonData(): Promise<void> {
    const [decimals, symbol, name] = await Promise.all([super.fetchContractData('decimals'), super.fetchContractData('symbol'), super.fetchContractData('name')]);

    this.symbol = symbol;
    this.decimals = decimals;
    this.name = name;
  }

  async getBalance(userAddress: string): Promise<string> {
    const balance = await super.fetchContractData('balanceOf', [userAddress]);

    return new BigNumber(balance).shiftedBy(-this.decimals).toFixed();
  }

  async approve(userAddress: string, recipient: string, amount: string): Promise<any> {
    const allowance = await super.fetchContractData(
      'allowance',
      [userAddress, recipient],
    );

    if (+allowance >= +amount) {
      return shiftedBy(allowance, this.decimals, 1);
    }

    try {
      const approveTx = await super.sendDataToContract('approve', [recipient, shiftedBy('1000000000', this.decimals)], userAddress);
      return approveTx;
    } catch (err) {
      throw error(500, 'approve error');
    }
  }

  async transfer(userAddress: string, recipient: string, amount: string): Promise<any> {
    try {
      const transferTx = await super.sendDataToContract('transfer', [recipient, amount], userAddress);
      return transferTx;
    } catch (err) {
      throw error(500, 'transfer error');
    }
  }

  subscribeToTokenTransactions(cb: (...aargs: any[]) => void): void {
    super.subscribeToContractEvents((data) => {
      const transaction: ITransaction = {
        from: data.returnValues.from,
        to: data.returnValues.to,
        tokenAddress: data.address,
        transactionHash: data.transactionHash,
        value: shiftedBy(data.returnValues.value, this.decimals, 1),
        type: 'Transfer',
      };

      cb(transaction);
    }, 'Transfer');

    super.subscribeToContractEvents((data) => {
      const transaction: ITransaction = {
        from: data.returnValues.owner,
        to: data.returnValues.spender,
        tokenAddress: data.address,
        transactionHash: data.transactionHash,
        value: shiftedBy(data.returnValues.value, this.decimals, 1),
        type: 'Approval',
      };

      cb(transaction);
    }, 'Approval');
  }
}
