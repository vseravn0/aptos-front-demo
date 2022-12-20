import { ITxnState } from '~/types/store/txn';

export const initState = (): ITxnState => ({
  txn: [],
});

export default initState();
