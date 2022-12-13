import { IModalsState } from '~/types/store/modals';

export const initState = (): IModalsState => ({
  isShow: false,
  currentModalKey: '',
});

export default initState;
