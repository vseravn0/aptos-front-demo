<template>
  <div class="main-page">
    <div class="main-page__bridge">
      <bridge-form />
    </div>
    <div class="main-page__trades">
      2
    </div>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import bridgeForm from '~/components/app/BridgeForm/index.vue';

// @vue/component
export default MainVue.extend({
  name: 'main-page',
  components: { bridgeForm },
  async mounted() {
    await this.$store.dispatch('web3/connectNode');
    await this.$store.dispatch('web3/setTokens', [process.env.ETH_TOKEN]);
    await this.$store.dispatch('aptos/getTokenData');
  },

});
</script>

<style scoped lang="scss">
.main-page {
  width: 100%;
  height: auto;
}
</style>
