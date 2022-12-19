<template>
  <div class="main-page">
    <div class="main-page__bridge">
      <bridge-form />
    </div>
    <div class="main-page__trades">
      <TradeList />
    </div>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import bridgeForm from '~/components/app/BridgeForm/index.vue';
import TradeList from '~/components/app/TradeList/index.vue';
import { mapGetters } from 'vuex';

// @vue/component
export default MainVue.extend({
  name: 'main-page',
  components: { TradeList, bridgeForm },
  computed: {
    ...mapGetters({
      isMetamaskConnected: 'aptos/getIsConnected',
      metamaskAddress: 'web3/getUserAddress',
      petraAddress: 'aptos/getUserAddress',
      isPetraConnected: 'web3/getIsConnected',
    }),
  },
  watch: {
    petraAddress: {
      handler(address:string) {
        if (address) {
          this.$store.dispatch('txn/txnRequest', address);
        }
      },
    },
    metamaskAddress: {
      handler(address:string) {
        if (address) {
          this.$store.dispatch('txn/txnRequest', address);
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('web3/connectNode');
    await this.$store.dispatch('web3/setTokens', [process.env.ETH_TOKEN]);
    await this.$store.dispatch('aptos/getTokenData');
  },

});
</script>

<style scoped lang="scss">
.main-page {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 30px;
  width: 100%;
  height: auto;
}
</style>
