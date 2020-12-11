import { ChainId, ETHER, JSBI, Percent, Token } from '@uniswap/sdk';

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors';

export const MAX_NUM_DECIMALS = 18;
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin',
);
export const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C',
);
export const USDT = new Token(
  ChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
);
export const COMP = new Token(
  ChainId.MAINNET,
  '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  18,
  'COMP',
  'Compound',
);
export const MKR = new Token(
  ChainId.MAINNET,
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  18,
  'MKR',
  'Maker',
);
export const CHI = new Token(
  ChainId.MAINNET,
  '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c',
  0,
  'CHI',
  'Chi Gastoken by 1inch',
);

export const ESW: ChainTokenList = {
  [ChainId.MAINNET]: [
    new Token(ChainId.MAINNET, window.env.REACT_APP_ESW_ID, 18, 'ESWc', 'EmiDAO Token'),
  ],
  [ChainId.ROPSTEN]: [
    new Token(ChainId.ROPSTEN, window.env.REACT_APP_ESW_ID, 18, 'ESWc', 'EmiDAO Token'),
  ],
  [ChainId.RINKEBY]: [
    new Token(ChainId.RINKEBY, window.env.REACT_APP_ESW_ID, 18, 'ESWc', 'EmiDAO Token'),
  ],
  [ChainId.GÖRLI]: [
    new Token(ChainId.GÖRLI, window.env.REACT_APP_ESW_ID, 18, 'ESWc', 'EmiDAO Token'),
  ],
  [ChainId.KOVAN]: [
    new Token(ChainId.KOVAN, window.env.REACT_APP_ESW_ID, 18, 'ESWc', 'EmiDAO Token'),
  ],
};

const ETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [ETHER],
  [ChainId.ROPSTEN]: [ETHER],
  [ChainId.RINKEBY]: [ETHER],
  [ChainId.GÖRLI]: [ETHER],
  [ChainId.KOVAN]: [ETHER],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.MAINNET]: [DAI, USDC, USDT, COMP, MKR, CHI],
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.MAINNET]: [DAI, USDC, USDT, CHI],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.MAINNET]: [ETHER, DAI, USDC, USDT, CHI],
};

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(
        ChainId.MAINNET,
        '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        8,
        'cDAI',
        'Compound Dai',
      ),
      new Token(
        ChainId.MAINNET,
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        8,
        'cUSDC',
        'Compound USD Coin',
      ),
    ],
    [USDC, USDT],
    [DAI, USDT],
    [ETHER, CHI],
    [USDC, CHI],
    [ETHER, USDC],
  ],
};

const TESTNET_CAPABLE_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
};

export const SUPPORTED_WALLETS =
  window.env.REACT_APP_CHAIN_ID !== '1'
    ? TESTNET_CAPABLE_WALLETS
    : {
        ...TESTNET_CAPABLE_WALLETS,
        ...{
          WALLET_CONNECT: {
            connector: walletconnect,
            name: 'WalletConnect',
            iconName: 'walletConnectIcon.svg',
            description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
            href: null,
            color: '#4196FC',
            mobile: true,
          },
          WALLET_LINK: {
            connector: walletlink,
            name: 'Coinbase Wallet',
            iconName: 'coinbaseWalletIcon.svg',
            description: 'Use Coinbase Wallet app on mobile device',
            href: null,
            color: '#315CF5',
          },
          COINBASE_LINK: {
            name: 'Open in Coinbase Wallet',
            iconName: 'coinbaseWalletIcon.svg',
            description: 'Open in Coinbase Wallet app.',
            href: 'https://go.cb-w.com/dFdHIRRZS8',
            color: '#315CF5',
            mobile: true,
            mobileOnly: true,
          },
          FORTMATIC: {
            connector: fortmatic,
            name: 'Fortmatic',
            iconName: 'fortmaticIcon.png',
            description: 'Login using Fortmatic hosted wallet',
            href: null,
            color: '#6748FF',
            mobile: true,
          },
          Portis: {
            connector: portis,
            name: 'Portis',
            iconName: 'portisIcon.png',
            description: 'Login using Portis hosted wallet',
            href: null,
            color: '#4A6C9B',
            mobile: true,
          },
        },
      };

export const NetworkContextName = 'NETWORK';

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE,
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.multiply(
  JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(9)),
  JSBI.BigInt(1_000_000 * 60),
); // 60GWei * 1_000_000

export const MIN_ETH_INVEST: JSBI = JSBI.multiply(
  JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(9)),
  JSBI.BigInt(8_000_000),
); // 8MWei * 1_000_000

export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000));

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL =
  'https://gateway.ipfs.io/ipfs/QmbrAQYoLLUxQcDyVLyJ2mcUYRFVQai3u4eLWJkBj9C8pU';

export const REFERRAL_ADDRESS_STORAGE_KEY = 'referral-address';
