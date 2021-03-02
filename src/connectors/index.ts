import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';
const NETWORK_URL = window['env'].REACT_APP_NETWORK_URL;
const FORMATIC_KEY = window['env'].REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = window['env'].REACT_APP_PORTIS_ID;

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC = 56,
  BSCTESTNET = 97
}

const chainIds = Object.keys(SupportedChainId).filter(Number).map(Number)

export const NETWORK_LABELS = {
  [SupportedChainId.MAINNET]: 'Main',
  [SupportedChainId.KOVAN]: 'Kovan',
  [SupportedChainId.BSC]: 'BSC',
  [SupportedChainId.BSCTESTNET]: 'BSC test'
};

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`);
}

export const network = new NetworkConnector({
  urls: { [Number(window['env'].REACT_APP_CHAIN_ID)]: NETWORK_URL },
});

export const injected = new InjectedConnector({
  supportedChainIds: chainIds,
});

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
});

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
});
