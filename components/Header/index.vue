<template>
  <header class="app-header">
    <div class="app-header__container">
      <img
        src="~assets/img/logo.svg"
        alt="logo cr"
        class="network__icon"
      >
      <div class="app-header__blockchain-block blockchain-block">
        <div class="blockchain-block__network network">
          <token-block
            v-if="aptToken.balance"
            :token="aptToken"
          />
          <token-block
            v-if="ethToken.balance"
            :token="ethToken"
          />
          <base-button
            :outlined="true"
            @click="showWalletsModal"
          >
            <span>{{ connectWalletsBtnText }}</span>
          </base-button>
        </div>
      </div>
    </div>
    <connect-wallets />
  </header>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { MODALS_KEY } from '~/utils/constants';
import TokenBlock from '~/components/app/TokenBlock/index.vue';
import { IModalOptions } from '~/types/components/ui/BaseModal';
import { mapGetters } from 'vuex';
import ConnectWallets from '~/components/Modals/ConnectWallets/index.vue';

// @vue/component
export default MainVue.extend({
  name: 'header-comp',
  components: { ConnectWallets, TokenBlock },
  data() {
    return {
      aptToken: {} as Record<string, string>,
      ethToken: {} as Record<string, string>,
    };
  },
  computed: {
    ...mapGetters({
      isMetamaskConnected: 'web3/getIsConnected',
      isPetraConnected: 'aptos/getIsConnected',
      tokens: 'web3/getTokensMap',
      aptosToken: 'aptos/getTokenData',
      userBalance: 'aptos/getUserBalance',
    }),
    isConnected():boolean {
      return this.isMetamaskConnected || this.isPetraConnected;
    },
    connectWalletsBtnText():string {
      return this.isConnected ? this.$tc('header.wallets') : this.$tc('header.connect-wallets');
    },
    modalConnectWallet(): IModalOptions {
      return {
        key: MODALS_KEY.CONNECT_WALLET,
        isFooterShow: false,
        isHeaderShow: false,
      };
    },
  },
  watch: {
    isMetamaskConnected: {
      async handler(bool:boolean) {
        if (bool) {
          await this.$store.dispatch('web3/updateTokenBalance', process.env.ETH_TOKEN);
          const { balance, symbol } = this.tokens[process.env.ETH_TOKEN as string];
          this.ethToken = { balance, symbol };
        }
      },
    },
    isPetraConnected: {
      async handler(bool:boolean) {
        if (bool) {
          await this.$store.dispatch('aptos/updateTokenBalance');
          const { symbol } = this.aptosToken;
          this.aptToken = {
            balance: this.userBalance,
            symbol,
          };
        }
      },
    },
  },
  methods: {
    showWalletsModal() {
      this.$store.dispatch('modals/show', { key: MODALS_KEY.CONNECT_WALLET });
    },
  },
});
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  padding: 16px 0;
  border: 1px solid $gray;

  &__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
  }
}

.blockchain-block {
  display: flex;
}

.network {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 13px;
  align-items: center;
}
</style>
