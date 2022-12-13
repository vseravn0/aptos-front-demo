<template>
  <div class="primary">
    <div class="primary__template template">
      <header-comp />
      <div class="template__content">
        <nuxt />
      </div>
      <div class="template__footer">
        Footer
      </div>
    </div>
    <portal-target name="portal" />
    <!--    <loader-screen />-->
  </div>
</template>
<script lang="ts">
import MainVue from '~/mixins/MainVue';
import Header from '~/components/Header/index.vue';

export default MainVue.extend({
  components: {
    'header-comp': Header,
  },
  mounted() {
    this.SetLoader(true);
    setTimeout(() => {
      this.SetLoader(false);
    }, 1000);
  },
});
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;

  &__template {
    display: grid;
    grid-template-rows: 80px 1fr auto;
    gap: 30px 0;
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

    @include container;
  }
}
</style>
