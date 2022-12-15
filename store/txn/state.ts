import { ITxnState } from '~/types/store/txn';

export const initState = (): ITxnState => ({
  txn: null,
});

export default initState();
