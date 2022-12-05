<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header header">
        <div class="header__container header__container_show">
          <div class="header__items">
            <div class="header__item">
              <span>Page 1</span>
            </div>
            <div class="header__item">
              <span>Page 2</span>
            </div>
            <div class="header__item">
              <span>Page 3</span>
            </div>
          </div>
          <div class="header__btn btn btn-primary">
            btn
          </div>
        </div>
      </div>
      <div class="template__content">
        <nuxt />
      </div>
      <div class="template__footer">
        Footer
      </div>
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script lang="ts">
import MainVue from '~/mixins/MainVue';

export default MainVue.extend({
  mounted() {
    this.SetLoader(true);
    setTimeout(() => {
      this.SetLoader(false);
    }, 1000);
  },
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;

  &__container {
    @include container;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #91979c;
  }

  &__items {
    display: flex;
  }

  &__item {

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  @include _991 {
    z-index: 150;

    &__container {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: -100%;
      flex-direction: column;
      max-width: 100%;
      padding: 20px 10px;
      transition: 0.3s;

      &_show {
        left: 0;
      }
    }

    &__items {
      flex-direction: column;
    }
  }
}

.primary {
  height: 100vh;
  overflow-y: auto;

  &__template {
    display: grid;
    grid-template-rows: 100px 1fr auto;
    height: 100%;
  }
}

.template {
  height: 100%;
  min-height: 100vh;
  overflow: auto;

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
