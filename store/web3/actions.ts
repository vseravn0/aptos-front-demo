import type { ActionTree } from 'vuex/types/index';
import BigNumber from 'bignumber.js';
import ConnectionWeb3 from '~/core/ConnectionWeb3';
import Token, { ITransaction } from '~/core/contracts/Token';
import {IWeb3V2State, ITokensMap} from "~/types/store/web3";

const actions: ActionTree<IWeb3V2State, IWeb3V2State> = {
  connectNode({ getters }) {
    const chainId = getters.getChainId;
    const connection = ConnectionWeb3.getInstance();
    connection.connectAnonProvider(chainId);
  },
  async connectWallet({ getters, commit }) {
    const connection = ConnectionWeb3.getInstance();
    const chainId = getters.getChainId;
    await connection.connectWallet(chainId, 'metamask');
    commit('SET_USER_ADDRESS', connection.userAddress);
    commit('SET_CHAIN_ID', connection.chainId);
    commit('SET_IS_CONNECTED', connection.isConnected);
  },
  async setTokens({ commit }, tokensAddresses) {
    this.$contractsManager.clearAnonContractsMap();

    const tokens: Token[] = await Promise.all(tokensAddresses.map(async (address: string) => {
      const token = new Token({ address });
      this.$contractsManager.addContractToAnonMap(
        token.address,
        token.createContractAnonInstance(),
      );
      await token.initAnonData();
      return token;
    }));

    const tokensMap = tokens.reduce((map: ITokensMap, token: Token) => {
      // eslint-disable-next-line no-param-reassign
      map[token.address] = token;
      return map;
    }, {});

    commit('SET_TOKENS_MAP', tokensMap);
  },
  initTokensContractByWallet({ getters }, tokensAddresses) {
    const tokensMap = getters.getTokensMap;
    let token: Token;

    this.$contractsManager.clearWalletContractsMap();

    tokensAddresses.forEach((address: string) => {
      token = tokensMap[address];
      this.$contractsManager.addContractToWalletMap(
        address,
        token.createContractWalletInstance(),
      );
    });
  },
  async updateTokensBalances({ commit, getters }) {
    const userAddress = getters.getUserAddress;
    const tokensMap = getters.getTokensMap;
    const tokens: Token[] = Object.values(tokensMap);

    const tokensBalances = await Promise.all(tokens.map(async (token: Token): Promise<any> => {
      const balance = await token.getBalance(userAddress);
      return { balance, address: token.address };
    }));

    commit('UPDATE_ALL_TOKENS_BALANCE', tokensBalances);
  },
  async updateTokenBalance({ commit, getters }, tokenAddress) {
    const userAddress = getters.getUserAddress;
    const tokensMap: ITokensMap = getters.getTokensMap;
    const balance = await tokensMap[tokenAddress].getBalance(userAddress);

    commit('UPDATE_TOKEN_BALANCE', { balance, address: tokenAddress });
  },
  async approveToken({ getters }, { tokenAddress, recipient, amount }) {
    const tokensMap: ITokensMap = getters.getTokensMap;
    const userAddress = getters.getUserAddress;
    const preparedAmount = new BigNumber(amount)
      .shiftedBy(+tokensMap[tokenAddress].decimals).toFixed();

    return await tokensMap[tokenAddress].approve(userAddress, recipient, preparedAmount);
  },
  async transferToken({ getters }, { tokenAddress, recipient, amount }) {
    const tokensMap: ITokensMap = getters.getTokensMap;
    const userAddress = getters.getUserAddress;
    const preparedAmount = new BigNumber(amount)
      .shiftedBy(+tokensMap[tokenAddress].decimals).toFixed();
    const tx = await tokensMap[tokenAddress].transfer(userAddress, recipient, preparedAmount);

    return tx;
  },
  setTransaction({ commit }, transaction: ITransaction) {
    commit('SET_TRANSACTION', transaction);
  },
};

export default actions;
