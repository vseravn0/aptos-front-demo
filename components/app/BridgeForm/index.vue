<template>
    <validation-observer
      v-slot="{ handleSubmit }"
      ref="observer"
      class="bridge-form"
      tag="div"
    >
      <form class="bridge-form__form" id="bridge-form" @submit.prevent="handleSubmit(sendBridgeForm)">
        <span class="bridge-form__title">{{$t('bridge-page.bridge-form.title')}}</span>
        <div class="bridge-form__inputs">
          <base-input v-model="recipientAddress"
                      :name="$t('bridge-page.bridge-form.inputs.recipient.name')"
                      :label="$t('bridge-page.bridge-form.inputs.recipient.title')"
                      :placeholder="$t('bridge-page.bridge-form.inputs.recipient.placeholder')"
                      :rules="'required'"
                      rounded="true"/>
          <base-input v-model="amount"
                      :name="$t('bridge-page.bridge-form.inputs.amount.name')"
                      :label="$t('bridge-page.bridge-form.inputs.amount.title')"
                      :rules="'required|numeric|greaterThanZero|min_value:1|max_value:365'"
                      :placeholder="$t('bridge-page.bridge-form.inputs.amount.placeholder')"
                      rounded="true"/>
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

// @vue/component
export default MainVue.extend({
  name: "bridge-form",
  data() {
    return {
      isLoading: false,
      recipientAddress: '',
      amount: null as null | string,
      loaderColor: '#9D84FF',
    };
  },
  methods:{
    sendBridgeForm():void{
      this.$store.dispatch('bridge/sendSwap')
    }
  }
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
