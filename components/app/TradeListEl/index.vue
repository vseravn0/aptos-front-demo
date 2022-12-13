<template>
  <div class="trade-list-el">
    <div class="trade-list-el__recipient el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.recipient') }}</span>
      <span class="el-column__content">{{ txn.recipient }}</span>
    </div>
    <div class="trade-list-el__txn el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.txn') }}</span>
      <span class="el-column__content">{{ txn.txn }}</span>
    </div>
    <div class="trade-list-el__amount el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.amount') }}</span>
      <span class="el-column__content">{{ txn.amount }}</span>
    </div>
    <base-button :outlined="true">
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
