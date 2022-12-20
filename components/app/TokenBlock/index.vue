<template>
  <div class="token-block">
    <span class="token-block__amount">{{ $cn(token.balance,2,2) }}</span>
    <span class="token-block__name">{{ token.symbol }}</span>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { PropType } from 'vue';

// @vue/component
export default MainVue.extend({
  name: 'token-block',
  props: {
    token: {
      required: true,
      type: Object as PropType<Record<string, string>>,
    },
  },
});
</script>

<style scoped lang="scss">
.token-block {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 13px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  background: $black;
  border: 1px solid $gray;
  border-radius: 14px;
}
</style>
