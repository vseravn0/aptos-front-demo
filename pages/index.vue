<template>
  <div class="main-page">
    <div class="main-page__bridge">
      <bridge-form />
    </div>
    <div class="main-page__trades">
      <trade-list-el :txn="testTxn" />
    </div>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import bridgeForm from '~/components/app/BridgeForm/index.vue';
import TradeListEl from '~/components/app/TradeListEl/index.vue';

// @vue/component
export default MainVue.extend({
  name: 'main-page',
  components: { TradeListEl, bridgeForm },
  computed: {
    testTxn():Record<string, string> {
      return {
        recipient: '0x06557D3c75fB0142d92656A5636363c84b63d2d0',
        txn: '0x06557D3c75fB0142d92656A5636363c84b63d2d0',
        amount: '100',
      };
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
