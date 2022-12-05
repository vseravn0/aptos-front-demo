import Vue from 'vue';

import BaseModalBox from '~/components/BaseModalBox/index.vue';
import BaseModalContainer from '~/components/BaseModalContainer/index.vue';
import BaseButton from '~/components/ui/BaseButton';
import BaseInput from '~/components/ui/BaseInput';
import BaseCard from '~/components/ui/BaseCard';

Vue.component('base-modal-container', BaseModalContainer);
Vue.component('base-modal-box', BaseModalBox);
Vue.component('base-input', BaseInput);
Vue.component('base-button', BaseButton);
Vue.component('base-card', BaseCard);
