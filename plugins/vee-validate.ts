import Vue from 'vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  setInteractionMode,
} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';
import type { Context } from '@nuxt/types';
import type { VeeValidateConfig } from 'vee-validate/dist/types/config';
import type { ValidationRule } from 'vee-validate/dist/types/types';
import Web3 from 'web3';

Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
setInteractionMode('eager');

Object.keys(rules).forEach((rule: string) : void => {
  const ruleObj: ValidationRule = (rules as Record<string, ValidationRule>)[rule];
  extend(rule, ruleObj);
});

export default ({ app }: Context): void => {
  configure({
    // eslint-disable-next-line no-underscore-dangle
    defaultMessage: (_field_, values) => app.i18n.t(`messages.${values._rule_}`, values),
  } as VeeValidateConfig);
};

extend('isAddress', {
  validate: (value) => Web3.utils.isAddress(value),
});

extend('greaterThanZero', {
  validate: (value) => value > 0,
});
