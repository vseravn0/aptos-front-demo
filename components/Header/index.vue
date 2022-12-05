<template>
  <header class="app-header">
    <div class="app-header__container">
      <img src="~assets/img/logo.svg" alt="logo cr" class="network__icon">
      <div class="app-header__blockchain-block blockchain-block">
        <div class="blockchain-block__network network">
          <base-button>
            {{$t('common.airdrop')}}
          </base-button>
          <base-button>
            0
          </base-button>
          <current-network :network="currentNetwork"/>
          <connect-btn/>
        </div>
<!--        <div class="blockchain-block__connect">-->
<!-- -->
<!--        </div>-->
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import CurrentNetwork from "~/components/ui/CurrentNetwork/index.vue";
import ConnectBtn from "~/components/app/ConnectBtn/index.vue";

// @vue/component
export default MainVue.extend({
  name: "header-comp",
  components: {ConnectBtn, CurrentNetwork},
  computed:{
    currentNetwork():Record<string, string>{
      return {
        logo: 'aptos',
        name: this.$tc('common.aptos')
      }
    }
  }
});
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  padding: 16px 0;
  border: 1px solid $gray;

  &__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
  }
}

.blockchain-block {
  display: flex;
}

.network {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 13px;
  align-items: center;
}
</style>
