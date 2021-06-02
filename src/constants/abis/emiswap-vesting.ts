import EMISWAP_VESTING_ABI from './emiswap-vesting.json';

const EMISWAP_VESTING_ADDRESS =
  window['env' as keyof Window].REACT_APP_EMISWAP_VESTING_ADDRESS || '';

export { EMISWAP_VESTING_ADDRESS, EMISWAP_VESTING_ABI };
