import UNISWAP_V2_HELPER_ABI from './uniswap-helper.json';

const UNISWAP_V2_HELPER_ADDRESS =
  window['env' as keyof Window].REACT_APP_UNISWAP_V2_HELPER_ADDRESS || '';

export { UNISWAP_V2_HELPER_ADDRESS, UNISWAP_V2_HELPER_ABI };
