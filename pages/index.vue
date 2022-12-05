<template>
  <div class="example">
    <base-button

      class="btn btn-primary"
      btn-type="button"
      @click="connectWallet"
    >
      {{ isConnected ? userAddress : 'connect wallet' }}
    </base-button>
    <p v-if="isConnected">
      Current chain: {{ chainId }}
    </p>
    <p>ETH price: {{ ethPrice }}</p>
    <div v-if="isTokensMap">
      <h4>
        Tokens:
      </h4>
      <div
        v-for="(token, address) in tokensMap"
        :key="address"
      >
        <input
          :id="`token-${address}`"
          v-model="selectedTokenAddress"
          :value="address"
          type="radio"
          name="tokens"
        >
        <label :for="`token-${address}`">
          {{ token.symbol }} ({{ token.decimals }})
          {{ token.balance || '-' }}
        </label>
      </div>
    </div>
    <validation-observer
      v-slot="{handleSubmit}"
      slim
    >
      <form
        @submit.prevent="handleSubmit(handleTransfer)"
      >
        <base-input
          v-model="amount"
          rules="required"
          name="Amount"
          label="Amount"
          placeholder="0"
        />
        <!-- 2 типа задания правил как и обычно в vee-validate -->
        <base-input
          v-model="recipient"
          :rules="{required: true, isAddress: true}"
          name="Recipient"
          label="Recipient"
          placeholder="0x0...."
        />
        <div>
          <base-button
            :loading="isApproveLodaing"
            :disabled="!isConnected"
            class="btn btn-primary"
            btn-type="button"
            @click="handleSubmit(handleApprove)"
          >
            Approve
          </base-button>
          <base-button
            :loading="isTransferLoading"
            :disabled="!isConnected"
            class="btn btn-primary"
            btn-type="submit"
          >
            Transfer
          </base-button>
        </div>
      </form>
    </validation-observer>

    Transactions:
    <base-card
      v-for="(transaction, hash) in transactionsMap"
      :key="hash"
      class="transactions"
    >
      <div class="transactions__content">
        <div class="transactions__col">
          <p>Type</p>
          <p>{{ transaction.type }}</p>
        </div>
        <div class="transactions__col">
          <p>from</p>
          <p :title="transaction.from">
            {{ truncate(transaction.from) }}
          </p>
        </div>
        <div class="transactions__col">
          <p>To</p>
          <p :title="transaction.to">
            {{ truncate(transaction.to) }}
          </p>
        </div>
        <div class="transactions__col">
          <p>Amount</p>
          <p>{{ transaction.value }}</p>
        </div>
        <div class="transactions__col">
          <p>hash</p>
          <p :title="transaction.transactionHash">
            {{ truncate(transaction.transactionHash) }}
          </p>
        </div>
      </div>
    </base-card>
  </div>
</template>
<script lang="ts">

import { mapActions, mapGetters } from 'vuex';
import MainVue from '~/mixins/MainVue';
// import modals from '~/store/modals/modals'
import { NETWORKS_TESTNET } from '~/utils/constants';
import { ITokensMap } from '~/store/web3/state';

export interface ITokenAddresses {
  [key: string]: string[],
}

export default MainVue.extend({
  data: () => ({
    recipient: '',
    amount: '',
    selectedTokenAddress: '',
    ethPrice: 0,
    isApproveLodaing: false,
    isTransferLoading: false,
  }),
  computed: {
    ...mapGetters({
      isConnected: 'web3/getIsConnected',
      userAddress: 'web3/getUserAddress',
      tokensMap: 'web3/getTokensMap',
      transactionsMap: 'web3/getTransactionsMap',
    }),
    chainId(): number {
      return this.$store.getters['web3/getChainId'];
    },
    isTokensMap(): boolean {
      return Boolean(Object.keys(this.tokensMap).length);
    },
    addressesTokens(): ITokenAddresses {
      return {
        ETH: [
          '0x0dD0A829bf99baa3A880191Db5B0e84b0be4fd75',
          '0x17F85408a7b83e913F2f60FdDb245635eD16de67',
          '0xa364f66F40B8117bBdb772c13Ca6A3d36FE95b13',
        ],
        BSC: [
          '0x8eAF00a26CaA8bb781896c54456f7bFcb50e4464',
          '0x30Fb848C459753892056d84C4684deB64b622f8D',
        ],
        POLYGON: [],
      };
    },
    currentTokensAddresses(): string[] {
      return this.addressesTokens[NETWORKS_TESTNET[this.chainId]];
    },
  },
  watch: {
    async isConnected(isConnected) {
      if (isConnected) {
        this.initWalletContracts(this.chainId);
        await this.updateBalances();
        this.subscribeToTokensTransactions();
      }
    },
    async userAddress(userAddress, oldUserAddress) {
      if (userAddress && userAddress !== oldUserAddress) {
        await this.updateBalances();
      }
    },
    async chainId(chainId, oldchainId) {
      if (chainId !== oldchainId) {
        await this.initAnonConnection(chainId);
        await this.initWalletContracts(chainId);
        await this.updateBalances();
      }
    },
    currentTokensAddresses(currentTokensAddresses: string[]) {
      [this.selectedTokenAddress] = currentTokensAddresses;
    },
  },
  async created() {
    try {
      await this.initAnonConnection(this.chainId);
      this.ethPrice = await this.$api.tokenService.getEthCost();
    } catch (err) {
      console.log('err: ', err);
      (this as any).$bvToast.toast('Oops, something went wrong, try to later');
    }
  },
  mounted() {
    [this.selectedTokenAddress] = this.addressesTokens[NETWORKS_TESTNET[this.chainId]];
  },
  methods: {
    ...mapActions({
      connectWallet: 'web3/connectWallet',
    }),
    truncate(str: string) {
      return str.length > 50 ? `${str.slice(0, 4)}...${str.slice(-4)}` : str;
    },
    async initAnonConnection(chainId: number) {
      try {
        this.$store.dispatch('web3/connectNode');
        await this.$store.dispatch('web3/setTokens', this.addressesTokens[NETWORKS_TESTNET[chainId]]);
      } catch (err) {
        console.log('err: ', err);
        (this as any).$bvToast.toast('Oops, something went wrong, try to later');
      }
    },
    async initWalletContracts(chainId: number) {
      try {
        await this.$store.dispatch('web3/initTokensContractByWallet', this.addressesTokens[NETWORKS_TESTNET[chainId]]);
      } catch (err) {
        console.log('isConnected err: ', err);
        (this as any).$bvToast.toast('Oops, something went wrong, try to later');
      }
    },
    subscribeToTokensTransactions() {
      Object.values(this.tokensMap as ITokensMap).forEach((token) => {
        token.subscribeToTokenTransactions((data) => {
          this.$store.dispatch('web3/setTransaction', data);
        });
      });
    },
    async handleApprove() {
      const payload = {
        tokenAddress: this.selectedTokenAddress,
        recipient: this.recipient,
        amount: this.amount,
      };

      try {
        this.isApproveLodaing = true;
        const tx = await this.$store.dispatch('web3/approveToken', payload);

        if (tx.transactionHash) {
          (this as any).$bvToast.toast(`Tx hash: ${tx.transactionHash}`, {
            title: 'Success',
            variant: 'success',
          });
        } else if (tx) {
          (this as any).$bvToast.toast(`Previously approved, allowance limit: ${tx}`, {
            title: 'Success',
            variant: 'success',
          });
        }
      } catch (err) {
        console.log('err: ', err);
        (this as any).$bvToast.toast('Oops, something went wrong, try to later', {
          title: 'Error',
          variant: 'danger',
        });
      } finally {
        this.isApproveLodaing = false;
      }
    },
    async handleTransfer() {
      const payload = {
        tokenAddress: this.selectedTokenAddress,
        recipient: this.recipient,
        amount: this.amount,
      };

      try {
        this.isTransferLoading = true;
        const tx = await this.$store.dispatch('web3/transferToken', payload);
        (this as any).$bvToast.toast(`Tx hash: ${tx.transactionHash}`, {
          title: 'Success',
          variant: 'success',
        });
        await this.updateBalance();
      } catch (err) {
        (this as any).$bvToast.toast('Oops, something went wrong, try to later', {
          title: 'Error',
          variant: 'danger',
        });
      } finally {
        this.isTransferLoading = false;
      }
    },
    async updateBalances() {
      try {
        await this.$store.dispatch('web3/updateTokensBalances');
      } catch (err) {
        console.log('updateBalances err: ', err);
        (this as any).$bvToast.toast('Oops, something went wrong, try to later', {
          title: 'Error',
          variant: 'danger',
        });
      }
    },
    async updateBalance() {
      try {
        await this.$store.dispatch('web3/updateTokenBalance', this.selectedTokenAddress);
      } catch (err) {
        console.log('updateBalance err: ', err);
        (this as any).$bvToast.toast('Oops, something went wrong, try to later', {
          title: 'Error',
          variant: 'danger',
        });
      }
    },
  },
});

</script>
<style lang="scss" scoped>
.example {
  @include container;
}

.transactions {
  margin-bottom: 10px;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
