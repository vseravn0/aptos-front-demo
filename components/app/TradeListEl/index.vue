<template>
  <div class="trade-list-el">
    <div class="trade-list-el__way el-column_chains">
      <div class="chain-box">
        <img
          class="chain-box__chain_img"
          :src="require(`assets/img/icons/${chainWay[txn.chainFrom].icon}.svg`)"
          alt="chain-from"
        >
        <span>{{ chainWay[txn.chainFrom].label }}</span>
      </div>
      <div class="chain-box_center">
        <img
          src="~assets/img/icons/arrow.svg"
          alt="arrow-way"
        >
      </div>
      <div class="chain-box">
        <img
          class="chain-box__chain_img"
          :src="require(`assets/img/icons/${chainWay[txn.chainTo].icon}.svg`)"
          alt="chain-from"
        >
        <span>{{ chainWay[txn.chainTo].label }}</span>
      </div>
    </div>
    <div class="trade-list-el__txn el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.sender') }}</span>
      <span class="el-column__content">{{ cut(txn.from,6) }}</span>
    </div>
    <div class="trade-list-el__recipient el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.recipient') }}</span>
      <span class="el-column__content">{{ cut(txn.to,6) }}</span>
    </div>
    <div class="trade-list-el__amount el-column">
      <span class="el-column__header">{{ $t('bridge-page.trade-list-el.amount') }}</span>
      <span class="el-column__content">{{ `${cnvrtAmount(txn.amount)} ${txn.tokenSymbol}` }}</span>
    </div>
    <base-button
      :outlined="true"
      @click="claim(txn)"
    >
      {{ $t('common.claim') }}
    </base-button>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import { PropType } from 'vue';
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import { APTOS_COIN_MODULES, APTOS_COIN_STRUCTURE } from '~/utils/constants';

// @vue/component
export default MainVue.extend({
  name: 'trade-list-el',
  props: {
    txn: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },
  computed: {
    chainWay():Record<string, Record<string, string>> {
      return {
        11155111: { icon: 'eth', label: this.$tc('common.eth') },
        2: { icon: 'aptos', label: this.$tc('common.aptos') },
      };
    },
    ...mapGetters({
      aptTokenData: 'aptos/getTokenData',
    }),
  },
  methods: {
    async ethClaim({
      amount, chainFrom, chainTo, from, id, nonce, to, tokenSymbol,
    }:Record<string, string>):Promise<void> {
      const signature = await this.$store.dispatch('txn/signatureRequest', id);
      await this.$store.dispatch('bridge/claim', [{
        amount, chainFrom, chainTo, from, nonce, to, tokenSymbol,
      }, signature]);
    },
    async aptClaim():Promise<void> {
      const payload = {
        function: `${process.env.APT_TOKEN}::${APTOS_COIN_MODULES.BRIDGE}::${APTOS_COIN_STRUCTURE.CLAIM}`,
        type_arguments: [`${process.env.APT_TOKEN}::${APTOS_COIN_MODULES.SUPPORTED_TOKENS}::${APTOS_COIN_STRUCTURE.USDT}`],
        arguments: [],
      };
      await this.$store.dispatch('aptos/sendTransaction', payload);
    },
    async claim({
      amount, chainFrom, chainTo, from, id, nonce, to, tokenSymbol,
    }:Record<string, string>) {
      try {
        switch (chainTo) {
          case '11155111':
            await this.ethClaim({
              amount, chainFrom, chainTo, from, id, nonce, to, tokenSymbol,
            });
            await this.$store.dispatch('web3/updateTokenBalance', process.env.ETH_TOKEN);
            break;
          case '2':
            await this.aptClaim();
            await this.$store.dispatch('aptos/updateTokenBalance');
            break;
          default: break;
        }
      } catch (e) {
        console.log(`claim err ${e}`);
      }
    },
    cut(str:string, symbol:number):string {
      return `${str.slice(0, symbol)}...${
        str.slice(str.length - symbol, str.length)}`;
    },
    cnvrtAmount(amount:string):string {
      return this.$cn(new BigNumber(amount).shiftedBy(-this.aptTokenData.decimals).toFixed(), 2, 2);
    },
  },
});
</script>

<style scoped lang="scss">
.trade-list-el {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: $gray;
  border-radius: 14px;
}

.el-column {
  display: flex;
  flex-direction: column;

  &_chains {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-items: center;
  }

  &__header {
    font-size: 14px;
    line-height: 17px;
    color: #747474;
  }

  &__content {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }
}

.chain-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__chain_img {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
  }

  &_center {
    margin: 0 auto;
  }
}
</style>
