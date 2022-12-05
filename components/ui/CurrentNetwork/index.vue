<template>
  <div class="current-network">
    <img :src="require(`/assets/img/icons/${network.logo}.svg`)" alt="eth" class="current-network__img">
    <span class="current-network__name">{{network.name}}</span>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import {PropType} from "vue";

// @vue/component
export default MainVue.extend({
  props:{
    network:{
      required: true,
      type: Object as PropType<Record<string, string>>
    }
  },
  name: "current-network",
});
</script>

<style scoped lang="scss">
.current-network {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 142px;
  padding: 13px;
  background: $black;
  border: 1px solid $gray;
  border-radius: 14px;

  &__name {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
