<template>
  <a
    v-if="link !== ''"
    class="base-btn"
    :class="btnClass"
    :href="link"
    target="_blank"
  >
    <slot />
  </a>
  <nuxt-link
    v-else-if="nuxtLink !== ''"
    class="base-btn"
    :class="btnClass"
    :to="nuxtLink"
  >
    <slot />
  </nuxt-link>
  <button
    v-else
    class="base-btn"
    :class="btnClass"
    :type="btnType"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <slot
      v-if="loading"
      name="loading"
    >
      <b-spinner
        class="base-btn__loader"
        :style="{color: loaderColor}"
      />
    </slot>
    <slot v-else />
  </button>
</template>
<script lang="ts">
import MainVue from '~/mixins/MainVue';

// @vue/component
export default MainVue.extend({
  name: 'base-button',
  props: {
    mode: {
      type: String,
      default: 'default',
      validator(value:string) {
        const available = ['default', 'danger', 'success', 'gray', 'secondary', 'tag'];

        return available.includes(value);
      },
    },
    link: {
      type: String,
      default: '',
    },
    nuxtLink: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    btnType: {
      type: String,
      default: 'button',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    loaderColor: {
      type: String,
      default: '#FFFFFF',
    },
  },
  computed: {
    btnClass() {
      const {
        disabled, mode, outlined, loading,
      } = this;
      return [
        { 'base-btn_danger': mode === 'danger' },
        { 'base-btn_success': mode === 'success' },
        { 'base-btn_disabled': disabled },
        { 'base-btn_loading': loading },
        { 'base-btn__outlined base-btn__outlined_default': outlined && mode === 'default' },
        { 'base-btn__outlined base-btn__outlined_danger': outlined && mode === 'danger' },
        { 'base-btn__outlined base-btn__outlined_success': outlined && mode === 'success' },
      ];
    },
  },
});
</script>
<style lang="scss" scoped>
.base-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: $white;
  text-decoration: none;
  background: $black;
  border-radius: 14px;
  transition: 0.3s;

  &_success {
    background: $success-btn-bg;
  }

  &_danger {
    background: $danger-btn-bg;
  }

  &_loading {
    color: transparent;
  }

  &_disabled {
    color: $white;
    cursor: not-allowed;
    background: $black;
    border: $gray;
    box-shadow: none;
    opacity: 0.5;
  }

  &__outlined {
    background: transparent;
    box-shadow: none;

    &_default {
      color: $white;
      border: 2px solid $green;

      &:hover {
        color: $white;
        background: $black;
      }

      &:disabled {
        color: $white;
        background: inherit;
      }
    }

    &_danger {
      border: 2px solid $danger-btn-bg;
    }

    &_success {
      border: 2px solid $success-btn-bg;
    }
  }

  &__loader {
    position: absolute;
  }
}
</style>
