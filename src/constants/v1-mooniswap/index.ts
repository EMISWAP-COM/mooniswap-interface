import { ChainId } from '@uniswap/sdk';
import V1_MOONISWAP_EXCHANGE_ABI from './v1_mooniswap_exchange.json';
import V1_MOONISWAP_FACTORY_ABI from './v1_mooniswap_factory.json';
import chainIds from '../chainIds';
import emirouter_addresses from '../emirouter_addresses';
import factory_addresses from '../factory_addresses';

const V1_MOONISWAP_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: factory_addresses[chainIds.MAINNET],
  [ChainId.ROPSTEN]: factory_addresses[chainIds.ROPSTEN],
  [ChainId.RINKEBY]: factory_addresses[chainIds.RINKEBY],
  [ChainId.GÖRLI]: factory_addresses[chainIds.GÖRLI],
  [ChainId.KOVAN]: factory_addresses[chainIds.KOVAN],
  // @ts-ignore
  [chainIds.KCC]: factory_addresses[chainIds.KCC],
  // @ts-ignore
  [chainIds.POLYGON]: factory_addresses[chainIds.POLYGON],
  [chainIds.MUMBAI]: factory_addresses[chainIds.MUMBAI],
  [chainIds.SHIDEN]: factory_addresses[chainIds.SHIDEN],
  [chainIds.AVALANCHE]: factory_addresses[chainIds.AVALANCHE],
  [chainIds.ASTAR]: factory_addresses[chainIds.ASTAR],
  [chainIds.GATECHAIN]: factory_addresses[chainIds.GATECHAIN],
  [chainIds.AURORA]: factory_addresses[chainIds.AURORA],
  [chainIds.MANDALA]: factory_addresses[chainIds.MANDALA],
};

const V1_EMIROUTER_HELPER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: emirouter_addresses[chainIds.MAINNET],
  [ChainId.ROPSTEN]: emirouter_addresses[chainIds.ROPSTEN],
  [ChainId.RINKEBY]: emirouter_addresses[chainIds.RINKEBY],
  [ChainId.GÖRLI]: emirouter_addresses[chainIds.GÖRLI],
  [ChainId.KOVAN]: emirouter_addresses[chainIds.KOVAN],
  // @ts-ignore
  [chainIds.KCC]: emirouter_addresses[chainIds.KCC],
  [chainIds.POLYGON]: emirouter_addresses[chainIds.POLYGON],
  [chainIds.MUMBAI]: emirouter_addresses[chainIds.MUMBAI],
  [chainIds.SHIDEN]: emirouter_addresses[chainIds.SHIDEN],
  [chainIds.AVALANCHE]: emirouter_addresses[chainIds.AVALANCHE],
  [chainIds.ASTAR]: emirouter_addresses[chainIds.ASTAR],
  [chainIds.GATECHAIN]: emirouter_addresses[chainIds.GATECHAIN],
  [chainIds.AURORA]: emirouter_addresses[chainIds.AURORA],
  [chainIds.MANDALA]: emirouter_addresses[chainIds.MANDALA],
};

export {
  V1_MOONISWAP_FACTORY_ABI,
  V1_MOONISWAP_EXCHANGE_ABI,
  V1_MOONISWAP_FACTORY_ADDRESSES,
  V1_EMIROUTER_HELPER_ADDRESSES,
};
