import Vue from 'vue';
import BigNumber from 'bignumber.js';

export default Vue.extend({
  methods: {
    SetLoader(value: boolean) {
      this.$store.dispatch('loader/setLoading', value);
    },
    $cn(value: (number | string), maxFractionDigits: number, minFractionDigits?: number, pre = '', post = '') {
      if (value === null || typeof value === 'undefined') { return '-'; }
      const bnValue = new BigNumber(value);
      const dp = bnValue.dp();
      // @ts-ignore
      const _min = dp < +maxFractionDigits ? dp : +maxFractionDigits;
      const minimumFractionDigits = typeof minFractionDigits === 'undefined' ? _min : minFractionDigits;
      const processed = bnValue.toFixed(maxFractionDigits, 1);
      const options = {
        maximumFractionDigits: maxFractionDigits,
        minimumFractionDigits,
      };
      // @ts-ignore
      return `${pre}${this.$n(Number(processed), options)}${post}`;
    },
  },
});
