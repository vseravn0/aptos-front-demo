<template>
  <div
    class="base-card"
    :class="[
      {[`base-card_bg-${type}`]: type},
      ...wrapperClasses
    ]"
  >
    <slot name="image" />
    <div
      v-if="$slots.header || title"
      class="base-card__header"
      :class="[
        {'base-card__header_border': withHeaderBorder},
        headerClasses
      ]"
    >
      <slot name="header">
        <h3 class="base-card__title">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div
      v-if="!noBody"
      class="base-card__body"
      :class="bodyClasses"
    >
      <slot />
    </div>

    <slot v-if="noBody" />

    <div
      v-if="$slots.footer"
      class="base-card__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts">
import MainVue from '~/mixins/MainVue';

export default MainVue.extend({
  name: 'Card',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    title: {
      type: String,
      default: '',
    },
    noBody: {
      type: Boolean,
      default: false,
    },
    wrapperClasses: {
      type: [String, Object, Array],
      default: '',
    },
    bodyClasses: {
      type: [String, Object, Array],
      default: '',
    },
    headerClasses: {
      type: [String, Object, Array],
      default: '',
    },
    footerClasses: {
      type: [String, Object, Array],
      default: '',
    },
    withHeaderBorder: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
  .base-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid $card-bg;
    border-radius: 10px;

    &_bg {

      &-default {
        background-color: $card-border;
      }
    }

    &__header {
      padding: 20px;

      &_border {
        border-bottom: 1px solid $card-bg;
      }
    }

    &__body {
      padding: 20px;
    }

    &__footer {
      padding: 20px;
      border-top: 1px solid $card-bg;
    }

    &__title {
      font-size: 18px;
      line-height: 22px;
      color: $main-text-color;
    }
  }

  @include _480 {

    .base-card {

      &__header {
        padding: 10px;
      }

      &__body {
        padding: 10px;
      }

      &__footer {
        padding: 10px;
      }
    }
  }
</style>
