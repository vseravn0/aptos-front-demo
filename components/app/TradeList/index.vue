<template>
  <div class="trade-list">
    <trade-list-el
      v-for="txn in tnxs"
      :key="txn.id"
      :txn="txn"
    />
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import TradeListEl from '~/components/app/TradeListEl/index.vue';
import { mapGetters } from 'vuex';

// @vue/component
export default MainVue.extend({
  name: 'trade-list',
  components: { TradeListEl },
  computed: {
    ...mapGetters({
      tnxs: 'txn/getTxn',
    }),
  },
});
</script>

<style scoped lang="scss">
.trade-list {
  display: grid;
  gap: 20px;
}
</style>
