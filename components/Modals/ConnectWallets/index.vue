<template>
  <base-modal :options="modalConnectWallet">
    <template #header>
      {{ $t('header.connect-wallets') }}
    </template>
    <div class="connect-modal">
      <div
        class="connect-btn"
        :class="connectMetamaskBtnClasses"
      >
        <img
          :src="require(`/assets/img/icons/eth.svg`)"
          alt="eth"
          class="connect-btn__img"
        >
        <base-button
          :outlined="true"
          :loading="isMetamaskLoading"
          :loader-color="loaderColor"
          @click="connectMetamaskHandler"
        >
          <span>{{ connectMetamaskBtnText }}</span>
          <img
            v-if="isMetamaskConnected"
            class="connect-btn__copy-img"
            src="~/assets/img/icons/copy.svg"
            :alt="$t('header.connect-wallet')"
          >
        </base-button>
      </div>
      <div
        class="connect-btn"
        :class="connectPetraBtnClasses"
      >
        <img
          :src="require(`/assets/img/icons/aptos.svg`)"
          alt="eth"
          class="connect-btn__img"
        >
        <base-button
          :outlined="true"
          :loading="isPetraLoading"
          :loader-color="loaderColor"
          @click="connectPetraHandler"
        >
          <span>{{ connectPetraBtnText }}</span>
          <img
            v-if="isPetraConnected"
            class="connect-btn__copy-img"
            src="~/assets/img/icons/copy.svg"
            :alt="$t('header.connect-wallet')"
          >
        </base-button>
      </div>
    </div>
  </base-modal>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { mapGetters } from 'vuex';
import { IModalOptions } from '~/types/components/ui/BaseModal';
import { MODALS_KEY } from '~/utils/constants';

// @vue/component
export default MainVue.extend({
  name: 'connect-wallets',
  data() {
    return {
      isMetamaskLoading: false,
      isPetraLoading: false,
      loaderColor: '#09f2c3',
    };
  },
  computed: {
    ...mapGetters({
      isMetamaskConnected: 'web3/getIsConnected',
      isPetraConnected: 'aptos/getIsConnected',
      userMetamaskAddress: 'web3/getUserAddress',
      userPetraAddress: 'aptos/getUserAddress',
    }),
    modalConnectWallet(): IModalOptions {
      return {
        key: MODALS_KEY.CONNECT_WALLET,
        isFooterShow: false,
        isHeaderShow: true,
      };
    },
    connectMetamaskBtnText():string {
      if (this.isMetamaskConnected) {
        return this.cutUserAddress(this.userMetamaskAddress);
      }
      if (!this.isMetamaskConnected && !this.isMetamaskLoading) {
        return this.$tc('header.metamask');
      }
      return '';
    },
    connectPetraBtnText():string {
      if (this.isPetraConnected) {
        return this.cutUserAddress(this.userPetraAddress);
      }
      if (!this.isPetraConnected && !this.isPetraLoading) {
        return this.$tc('header.petra');
      }
      return '';
    },
    connectMetamaskBtnClasses():Record<string, boolean> {
      return { 'connect-btn_connected': this.isMetamaskConnected, 'connect-btn_loading': this.isMetamaskLoading };
    },
    connectPetraBtnClasses():Record<string, boolean> {
      return { 'connect-btn_connected': this.isPetraConnected, 'connect-btn_loading': this.isPetraLoading };
    },
  },
  methods: {
    copyAddress(address:string) {
      this.$copyText(address);
    },
    async connectMetamask() {
      this.isMetamaskLoading = true;
      try {
        await this.$store.dispatch('web3/connectWallet');
      } catch (e) {
        console.log(e);
      } finally {
        this.isMetamaskLoading = false;
      }
    },
    async connectPetra() {
      this.isPetraLoading = true;
      try {
        await this.$store.dispatch('aptos/connectWallet');
      } catch (e) {
        console.log(e);
      } finally {
        this.isPetraLoading = false;
      }
    },
    connectMetamaskHandler():void {
      if (this.isMetamaskConnected) {
        this.copyAddress(this.userMetamaskAddress);
        return;
      }
      this.connectMetamask();
    },
    connectPetraHandler():void {
      if (this.isPetraConnected) {
        this.copyAddress(this.userPetraAddress);
        return;
      }
      this.connectPetra();
    },
    cutUserAddress(address:string):string {
      return `${address.slice(0, 4)}...${
        address.slice(address.length - 4, address.length)}`;
    },
  },
});
</script>

<style scoped lang="scss">
.connect-modal {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  &__header {
    text-align: center;
  }
}

.connect-btn {
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    border-radius: 40px;
  }
  /* stylelint-disable no-descending-specificity */

  &_connected {

    button {
      color: $white;
      background: $gray;
      border-radius: 10px;

      &:hover {
        background: $green;
      }
    }
  }

  &_loading {

    button {
      justify-content: center;
    }
  }

  &__copy-img {
    width: 24px;
    height: 24px;
    margin: 0 0 0 5px;
  }
}
</style>
