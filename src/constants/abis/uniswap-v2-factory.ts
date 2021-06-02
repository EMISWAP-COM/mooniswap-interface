import UNISWAP_V2_FACTORY_ABI from './uniswap-v2-factory.json';

const UNISWAP_V2_FACTORY_ADDRESS =
  window['env' as keyof Window].REACT_APP_UNISWAP_V2_FACTORY_ADDRESS || '';

export { UNISWAP_V2_FACTORY_ADDRESS, UNISWAP_V2_FACTORY_ABI };
