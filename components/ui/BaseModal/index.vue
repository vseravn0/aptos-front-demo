<template>
  <portal
    v-if="isShow && (options.key === modalKey)"
    to="portal"
  >
    <div
      class="base-modal"
      @mousedown.self="clickOutside"
    >
      <div
        class="base-modal__content"
      >
        <div
          v-if="options.isHeaderShow"
          class="base-modal__header"
        >
          <slot name="header" />
        </div>
        <div class="base-modal__body">
          <slot />
        </div>
        <div
          v-if="options.isFooterShow"
          class="base-modal__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </portal>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { mapGetters } from 'vuex';
import { PropType } from 'vue';
import { IModalOptions } from '~/types/components/ui/BaseModal';

export default MainVue.extend({
  name: 'base-modal',
  props: {
    options: {
      type: Object as PropType <IModalOptions>,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      modalKey: 'modals/getCurrentModalKey',
    }),
  },
  methods: {
    hide() {
      if (typeof this.options.hideCallback === 'function') {
        this.options.hideCallback();
      }
      this.$store.dispatch('modals/hide');
    },
    clickOutside() {
      if (!this.options?.isNoneClickOutSide) {
        this.hide();
      }
    },
  },
});
</script>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);

  &__content {
    position: relative;
    width: 100%;
    max-width: 522px;
    padding: 32px;
    margin: 0 16px;
    background-color: $black;
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 16px;
  }

  &__body-content {
    margin-bottom: 32px;
  }

  &__btn-close {
    position: absolute;
    top: 56px;
    right: 37px;
    width: 24px;
    height: 24px;
    border: none;

    &::after,
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
    }
  }

  &__footer {
    display: flex;
    margin: 24px 0 0 0;
  }

  &__header {
    margin: 0 0 24px 0;
    font-size: 24px;
    text-align: center;
  }

  &__btn {
    width: 100%;
  }
}
</style>
