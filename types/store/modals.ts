export interface IModalKey {
  key: string; // название компонента модалки, берется из modals.ts
}

export interface IModalsState {
  isShow: boolean,
  currentModalKey: string,
}
