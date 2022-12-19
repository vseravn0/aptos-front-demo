<template>
  <div class="trade-list-el">
    <div class="trade-list-el__recipient el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.recipient') }}</span>
      <span class="el-column__content">{{ txn.from }}</span>
    </div>
    <div class="trade-list-el__txn el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.txn') }}</span>
      <span class="el-column__content">{{ txn.to }}</span>
    </div>
    <div class="trade-list-el__amount el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.amount') }}</span>
      <span class="el-column__content">{{ txn.amount }}</span>
    </div>
    <base-button
      :outlined="true"
      @click="claim(txn)"
    >
      {{ $t('common.claim') }}
    </base-button>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { PropType } from 'vue';

// @vue/component
export default MainVue.extend({
  name: 'trade-list-el',
  props: {
    txn: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },
  methods: {
    async claim({
      amount, chainFrom, chainTo, from, id, nonce, to, tokenSymbol,
    }:any) {
      const signature = await this.$store.dispatch('txn/signatureRequest', id);
      // const payload = {
      //   function: '0x06d6080cb1ecadb865b6cc88c040d27373637119e1f1697ffe99375e9de12513::Bridge::claim',
      //   type_arguments: ['0x06d6080cb1ecadb865b6cc88c040d27373637119e1f1697ffe99375e9de12513::SupportedTokens::USDT'],
      //   arguments: [],
      // };
      // await this.$store.dispatch('aptos/sendTransaction', payload);
      await this.$store.dispatch('bridge/claim', [{
        amount, chainFrom, chainTo, from, nonce, to, tokenSymbol,
      }, signature]);
    },
  },
});
</script>

<style scoped lang="scss">
.trade-list-el {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%;
  padding: 20px;
  background: $gray;
  border-radius: 14px;
}

.el-column {
  display: flex;
  flex-direction: column;

  &__header {
    font-size: 14px;
    line-height: 17px;
    color: #747474;
  }

  &__content {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }
}
</style>
