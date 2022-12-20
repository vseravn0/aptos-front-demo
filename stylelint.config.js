module.exports = {
  extends: ['stylelint-config-good-scss'],
  rules: {
    'rule-empty-line-before': 'always',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
