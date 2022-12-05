<template>
  <header class="app-header">
    <div class="app-header__container">
      <img src="~assets/img/logo.svg" alt="logo cr" class="network__icon">
      <div class="app-header__blockchain-block blockchain-block">
        <div class="blockchain-block__network network">
          <base-button>
            {{$t('common.airdrop')}}
          </base-button>
          <base-button @click="aptos">
            aptos
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
  },
  methods:{
    async aptos():void{
      const data = null;

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });

      xhr.open("GET", "https://fullnode.testnet.aptoslabs.com/v1/accounts/0x81f23757db90614ec2598cf5012a42f96d357fd9778b22f44fd9c535dee3cb83");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(data);
      // const response = await window.martian.connect();
      // const sender = response.address;
      // // claim
      // // const payload = {
      // //   function: "0x7612ebde3ecc5ef5ac9248011da4fd3bcbd695f645048e6f1fca8e1f91cade1a::Bridge::claim",
      // //   type_arguments: ["0x7612ebde3ecc5ef5ac9248011da4fd3bcbd695f645048e6f1fca8e1f91cade1a::SupportedTokens::USDT"],
      // //   arguments: []
      // // };
      // // view balance
      // const payload = {
      //     function: "0x7612ebde3ecc5ef5ac9248011da4fd3bcbd695f645048e6f1fca8e1f91cade1a::Bridge::get_credits",
      //     type_arguments: ["0x7612ebde3ecc5ef5ac9248011da4fd3bcbd695f645048e6f1fca8e1f91cade1a::SupportedTokens::USDT"],
      //     arguments: ['address']
      // }
      // const transaction = await window.martian.generateTransaction(sender,payload);
      // console.log(transaction);
      // const signedTxn = await window.martian.signTransaction(transaction);
      // const txnHash = await window.martian.submitTransaction(signedTxn);
      // console.log(txnHash);
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
