<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="loader"
      :class="{'loader_hider': false}"
    >
      <div class="loader__body">
        <div class="loader__anim">
          <div class="lds-dual-ring" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { mapGetters } from 'vuex';

import MainVue from '~/mixins/MainVue';

export default MainVue.extend({
  computed: {
    ...mapGetters({
      isLoading: 'loader/getIsLoading',
    }),
  },
});
</script>
<style lang="scss" scoped>

.loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgba(#000, 0.6);

  &_hider {
    background: #fff;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__text {
    padding: 1px 8px;
    font-size: 12px;
    font-weight: bold;
    color: #000;
    background: #faeeeb;
    border-radius: 5px;
  }
}

.dots {
  padding-right: 10px;

  &::after {
    margin-left: -3px;
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }
}

$dotsColor: #000;

@keyframes dots {

  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow:
      0.25em 0 0 rgba(0, 0, 0, 0),
      0.5em 0 0 rgba(0, 0, 0, 0);
  }

  40% {
    color: $dotsColor;
    text-shadow:
      0.25em 0 0 rgba(0, 0, 0, 0),
      0.5em 0 0 rgba(0, 0, 0, 0);
  }

  60% {
    text-shadow:
      0.25em 0 0 $dotsColor,
      0.5em 0 0 rgba(0, 0, 0, 0);
  }

  80%,
  100% {
    text-shadow:
      0.25em 0 0 $dotsColor,
      0.5em 0 0 $dotsColor;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring::after {
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  content: " ";
  border: 6px solid #fff;
  border-color: #fff transparent #faeeeb transparent;
  border-radius: 50%;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>
