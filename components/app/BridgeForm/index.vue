

<!--<template>-->
<!--  <validation-observer-->
<!--    v-slot="{ handleSubmit }"-->
<!--    ref="observer"-->
<!--    class="contact-form"-->
<!--    tag="div"-->
<!--  >-->
<!--    <form-->
<!--      id="contact-form"-->
<!--      class="contact-form__form"-->
<!--      @submit.prevent="handleSubmit(sendContactUsForm)"-->
<!--    >-->
<!--      <div class="contact-form__inputs">-->
<!--        <base-input-->
<!--          v-model="userName"-->
<!--          :name="$t('contactPage.contactForm.inputs.name.name')"-->
<!--          :label="$t('contactPage.contactForm.inputs.name.title')"-->
<!--          :placeholder="$t('contactPage.contactForm.inputs.name.placeholder')"-->
<!--          :rules="'required|alpha|min:4|max:50'"-->
<!--          :rounded="true"-->
<!--        />-->
<!--        <base-input-->
<!--          v-model="userCompany"-->
<!--          :name="$t('contactPage.contactForm.inputs.company.name')"-->
<!--          :label="$t('contactPage.contactForm.inputs.company.title')"-->
<!--          :placeholder="$t('contactPage.contactForm.inputs.company.placeholder')"-->
<!--          :rules="'min:2|max:50'"-->
<!--          :rounded="true"-->
<!--        />-->
<!--        <base-input-->
<!--          v-model="userEmail"-->
<!--          :name="$t('contactPage.contactForm.inputs.email.name')"-->
<!--          :label="$t('contactPage.contactForm.inputs.email.title')"-->
<!--          :placeholder="$t('contactPage.contactForm.inputs.email.placeholder')"-->
<!--          :rules="'required|email|min:4|max:50'"-->
<!--          :rounded="true"-->
<!--        />-->
<!--        <base-textarea-->
<!--          v-model="userDesc"-->
<!--          :name="$t('contactPage.contactForm.textareas.desc.name')"-->
<!--          :label="$t('contactPage.contactForm.textareas.desc.title')"-->
<!--          :placeholder="$t('contactPage.contactForm.textareas.desc.placeholder')"-->
<!--          :rules="'required|min:20|max:200'"-->
<!--          :rounded="true"-->
<!--        />-->
<!--        <base-checkbox-->
<!--          v-model="isAgree"-->
<!--          class="contact-form__checkbox"-->
<!--        >-->
<!--          <p class="contact-form__text">-->
<!--            {{ $t('contactPage.contactForm.privacy.text') }}-->
<!--            <span class="contact-form__text_purple">-->
<!--              {{ $t('contactPage.contactForm.privacy.privacy') }}</span>-->
<!--            {{ $t('common.and') }} <span class="contact-form__text_purple">-->
<!--              {{ $t('contactPage.contactForm.privacy.cookie') }}</span> .-->
<!--          </p>-->
<!--        </base-checkbox>-->
<!--      </div>-->
<!--      <base-button-->
<!--        form="contact-form"-->
<!--        type="submit"-->
<!--        :loading="isLoading"-->
<!--        :loader-color="loaderColor"-->
<!--        :disabled="isLoading || !isAgree"-->
<!--        :outlined="true"-->
<!--      >-->
<!--        {{ $tc('common.submit') }}-->
<!--      </base-button>-->
<!--    </form>-->
<!--    <base-modal :options="modalContact">-->
<!--      <template #header>-->
<!--        <h3 class="contact-modal__title">-->
<!--          {{ $t('modals.contact.title') }}-->
<!--        </h3>-->
<!--      </template>-->
<!--      <template>-->
<!--        <p class="contact-modal__text">-->
<!--          {{ $t('modals.contact.desc') }}-->
<!--          <span class="contact-modal__text_purple">{{ userEmail }}</span>.-->
<!--        </p>-->
<!--      </template>-->
<!--      <template #footer>-->
<!--        <base-button-->
<!--          class="contact-modal__btn"-->
<!--          :outlined="true"-->
<!--          @click="hideModal"-->
<!--        >-->
<!--          {{ $t('common.close') }}-->
<!--        </base-button>-->
<!--      </template>-->
<!--    </base-modal>-->
<!--  </validation-observer>-->
<!--</template>-->

<script lang="ts">
import MainVue from '~/mixins/MainVue';

// @vue/component
export default MainVue.extend({
  name: "bridge-form"
});
</script>

<style scoped lang="scss">

</style>
