import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: [-18, 60] });

export const shiftedBy = (value: string, decimals: string, mode: number | 0 = 0): string => {
  const decimalsInt = mode === 0 ? parseInt(decimals, 10) : -parseInt(decimals, 10);
  return new BigNumber(value).shiftedBy(decimalsInt).toString();
};

export const debounce = (originalFn: (...args: any[]) => void, timeoutMs = 66): any => {
  let timeoutId: any;
  return (...args : any):void => {
    // clear timeout every time the function is called
    clearTimeout(timeoutId);
    // call the original function once "timeoutMs" ms after the last call have elapsed
    timeoutId = setTimeout(() => originalFn(...args), timeoutMs);
  };
};

export const throttle = (originalFn: (...args: any[]) => void, timeout = 66): any => {
  let timeoutId: any;
  return (...args: any): void => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      originalFn(...args);
    }, timeout);
  };
};
