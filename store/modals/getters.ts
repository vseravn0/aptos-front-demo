import type { GetterTree } from 'vuex';
import { IModalsState } from '~/types/store/modals';
import { IRootState } from '~/types/store';

const getters: GetterTree<IModalsState, IRootState> = {
  getIsShow: (state): boolean => state.isShow,
  getCurrentModalKey: (state): string => state.currentModalKey,
};

export default getters;
