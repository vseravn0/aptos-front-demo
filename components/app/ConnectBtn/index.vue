<template>
  <div
    class="connect-btn"
    :class="connectBtnClasses"
  >
    <base-button
      :outlined="true"
      :loading="isLoading"
      :loader-color="loaderColor"
      @click="connectHandler"
    >
      <span>{{ connectBtnText }}</span>
      <img
        v-if="isConnected"
        class="connect-btn__copy-img"
        src="~/assets/img/icons/copy.svg"
        :alt="$t('header.connect-wallet')"
      >
    </base-button>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { mapGetters } from 'vuex';

// @vue/component
export default MainVue.extend({
  name: 'connect-btn',
  data() {
    return {
      isLoading: false,
      loaderColor: '#09f2c3',
    };
  },
  computed: {
    ...mapGetters({
      isConnected: 'web3/getIsConnected',
      userAddress: 'web3/getUserAddress',
    }),
    connectBtnText():string {
      if (this.isConnected) {
        return this.cutUserAddress(this.userAddress);
      }
      if (!this.isConnected && !this.isLoading) {
        return this.$tc('header.connect-wallet');
      }
      return '';
    },
    connectBtnClasses():Record<string, boolean> {
      return { 'connect-btn_connected': this.isConnected, 'connect-btn_loading': this.isLoading };
    },
  },
  methods: {
    copyAddress() {
      this.$copyText(this.userAddress);
    },
    async connectWallet() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('web3/connectWallet');
      } catch (err) {
        console.dir(err);
      } finally {
        this.isLoading = false;
      }
    },
    connectHandler():void {
      if (this.isConnected) {
        this.copyAddress();
        return;
      }
      this.connectWallet();
    },
    cutUserAddress(address:string):string {
      return `${address.slice(0, 4)}...${
        address.slice(this.userAddress.length - 4, address.length)}`;
    },
  },
});
</script>

<style scoped lang="scss">
.connect-btn {

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 170px;
    padding: 12px 24px 10px;
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
