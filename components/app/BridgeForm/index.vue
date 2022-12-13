<template>
  <validation-observer
    v-slot="{ handleSubmit }"
    ref="observer"
    class="bridge-form"
    tag="div"
  >
    <form
      id="bridge-form"
      class="bridge-form__form"
      @submit.prevent="handleSubmit(sendBridgeForm)"
    >
      <span class="bridge-form__title">{{ $t('bridge-page.bridge-form.title') }}</span>
      <div class="bridge-form__inputs">
        <base-input
          v-model="recipientAddress"
          :name="$t('bridge-page.bridge-form.inputs.recipient.name')"
          :label="$t('bridge-page.bridge-form.inputs.recipient.title')"
          :placeholder="$t('bridge-page.bridge-form.inputs.recipient.placeholder')"
          :rules="'required'"
          rounded="true"
        />
        <base-input
          v-model="amount"
          :name="$t('bridge-page.bridge-form.inputs.amount.name')"
          :label="$t('bridge-page.bridge-form.inputs.amount.title')"
          :rules="'required|numeric|greaterThanZero|min_value:1|max_value:365'"
          :placeholder="$t('bridge-page.bridge-form.inputs.amount.placeholder')"
          rounded="true"
        />
      </div>
      <base-button
        form="bridge-form"
        type="submit"
        :loading="isLoading"
        :loader-color="loaderColor"
        :disabled="isLoading"
        :outlined="true"
      >
        {{ $t('common.swap') }}
      </base-button>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue';
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';

// @vue/component
export default MainVue.extend({
  name: 'bridge-form',
  data() {
    return {
      isLoading: false,
      recipientAddress: '',
      amount: '',
      loaderColor: '#09f2c3',
    };
  },
  computed: {
    ...mapGetters({
      ethTokenData: 'web3/getTokensMap',
      aptTokenData: 'aptos/getTokenData',
      chainId: 'web3/getChainId',
    }),
  },
  methods: {
    convertAmount(amount:string|null, decimal:number):string|void {
      if (amount) {
        return new BigNumber(amount).shiftedBy(decimal).toFixed();
      }
      return undefined;
    },
    sendBridgeForm():void {
      if (this.isAptosAddress(this.recipientAddress)) {
        this.sendEthTxn(this.recipientAddress, this.amount);
        this.reset();
        return;
      }
      this.sendAptTxn(this.recipientAddress, this.amount);
      this.reset();
    },
    isAptosAddress(address:string):boolean {
      return address.length === 66;
    },
    sendEthTxn(recipient:string, amount:string):void {
      this.$store.dispatch('bridge/sendSwap', {
        recipient,
        amount: this.convertAmount(
          amount,
          +this.ethTokenData[process.env.ETH_TOKEN as string].decimals,
        ),
      });
    },
    sendAptTxn(recipient:string, amount:string):void {
      const txn = {
        function: `${process.env.APT_TOKEN}::Bridge::send`,
        type_arguments: [`${process.env.APT_TOKEN}::SupportedTokens::USDT`],
        arguments: [`${recipient}`, `${this.chainId}`, `${new BigNumber(amount).shiftedBy(this.aptTokenData.decimals).toFixed()}`],
      };
      console.log(txn);
      this.$store.dispatch('aptos/sendTransaction', txn);
    },
    reset():void {
      this.recipientAddress = '';
      this.amount = '';
      (this.$refs.observer as HTMLFormElement).reset();
    },
  },
});
</script>

<style scoped lang="scss">
.bridge-form {
  width: 100%;

  &__form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    width: 100%;
    height: auto;
    padding: 30px;
    background: $gray;
    border-radius: 14px;
  }

  &__title {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
  }
}
</style>
