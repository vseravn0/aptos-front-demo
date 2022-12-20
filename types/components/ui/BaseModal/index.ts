interface IBtnOptions {
  outlined: boolean,
  mode: string,
  action: () => void,
  desc: string,
  loading: boolean,
  disabled: boolean
}

export interface IModalOptions {
  title?: string,
  text?: string,
  key: string,
  isFooterShow?: boolean,
  isHeaderShow?: boolean,
  isCloseBtn?: boolean,
  callback?: any,
  btns?:Array<IBtnOptions>,
  loader?: any,
  isNoneClickOutSide?: boolean,
  hideCallback?: () => void,
  isUnclosable?: boolean
}
