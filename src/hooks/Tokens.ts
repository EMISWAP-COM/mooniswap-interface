import { parseBytes32String } from '@ethersproject/strings';
import { ETHER, Token, ZERO_ADDRESS } from '@uniswap/sdk';
import { useEffect, useMemo, useState } from 'react';
import { useDefaultTokenList, WrappedTokenInfo } from '../state/lists/hooks';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useUserAddedTokens } from '../state/user/hooks';
import { getLpTokenByAddress, isAddress } from '../utils';
import { useActiveWeb3React } from './index';
import { useBytes32TokenContract, useTokenContract } from './useContract';
import {
  useDefaultCoin,
  useIsAuroraActive,
  useIsAvalancheActive,
  useIsAstarActive,
  useIsGateChainActive,
  useIsEthActive,
  useIsKCCActive,
  useIsPolygonActive,
  useIsShidenActive,
  useNetworkData,
  useIsMandalaActive,
} from './Coins';
import { useTokenListWithPair } from './useTokenListWithPair';
import defaultCoins, { mustVisibleAddresses } from '../constants/defaultCoins';

export declare interface Window {
  env: Record<string, unknown>;
}

export function useAllTokens(isLpTokens?: boolean): [{ [address: string]: Token }, boolean] {
  const { chainId } = useActiveWeb3React();
  const userAddedTokens = useUserAddedTokens();
  const allTokens = useDefaultTokenList();
  const [enableTokensList, isLoading] = useTokenListWithPair();

  const isKCCActive = useIsKCCActive();
  const isPolygonActive = useIsPolygonActive();
  const isShidenActive = useIsShidenActive();
  const isAvalancheActive = useIsAvalancheActive();
  const isAstarActive = useIsAstarActive();
  const isGateChainActive = useIsGateChainActive();
  const isAuroraActive = useIsAuroraActive();
  const isMandalaActive = useIsMandalaActive();

  return [
    useMemo(() => {
      if (!chainId) {
        return {};
      }
      const filteredTokens = Object.values(allTokens[chainId])
        .filter(el => {
          if (isKCCActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                mustVisibleAddresses.kcc.includes(el.address.toLowerCase()),
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isPolygonActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WMATIC',
              // && mustVisibleAddresses.polygon.includes(el.address.toLowerCase())
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isAvalancheActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                (ct.chainId === chainId &&
                  el.address.toLowerCase() === ct.address.toLowerCase() &&
                  mustVisibleAddresses.avalanche.includes(el.address.toLowerCase())) ||
                enableTokensList.includes(el.address) ||
                el.address === window['env'].REACT_APP_ESW_ID,
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isAuroraActive) {
            const exists = defaultCoins.tokens.find(
              ct => ct.chainId === chainId && el.address.toLowerCase() === ct.address.toLowerCase(),
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isPolygonActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WMATIC',
              // && mustVisibleAddresses.polygon.includes(el.address.toLowerCase())
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isShidenActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WSDN',
            );

            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isAstarActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WASTR',
            );

            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isGateChainActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WGT',
            );

            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isMandalaActive) {
            const exists = defaultCoins.tokens.find(
              ct => ct.chainId === chainId && el.address.toLowerCase() === ct.address.toLowerCase(), // &&
              // ct.symbol !== 'ACA',
            );

            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          }

          // @ts-ignore // todo: fix it
          return (
            enableTokensList.includes(el.address) || el.address === window['env'].REACT_APP_ESW_ID
          );
        })
        /*.filter(el => {
          return (isLpTokens && el.name?.includes('LP '))
            || (!isLpTokens && !el.name?.includes('LP '));
        })*/
        .reduce((acc: { [key: string]: WrappedTokenInfo }, val) => {
          acc[val.address] = val;
          return acc;
        }, {});
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token;
              return tokenMap;
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...filteredTokens },
          )
      );
    }, [
      chainId,
      userAddedTokens,
      allTokens,
      enableTokensList,
      isKCCActive,
      isPolygonActive,
      isShidenActive,
      isAvalancheActive,
      isAuroraActive,
    ]),
    isLoading,
  ];
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

function parseStringOrBytes32(
  str: string | undefined,
  bytes32: string | undefined,
  defaultValue: string,
): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue;
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React();
  const [tokens] = useAllTokens();

  const address = isAddress(tokenAddress);
  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
  const defaultToken = useDefaultCoin(tokenAddress);
  const token: Token | undefined = (address ? tokens[address] : undefined) || defaultToken;

  const tokenName = useSingleCallResult(
    token ? undefined : tokenContract,
    'name',
    undefined,
    NEVER_RELOAD,
  );
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD,
  );
  const symbol = useSingleCallResult(
    token ? undefined : tokenContract,
    'symbol',
    undefined,
    NEVER_RELOAD,
  );
  const symbolBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'symbol',
    undefined,
    NEVER_RELOAD,
  );
  const decimals = useSingleCallResult(
    token ? undefined : tokenContract,
    'decimals',
    undefined,
    NEVER_RELOAD,
  );

  return useMemo(() => {
    if (token) {
      return token;
    }
    if (!chainId || !address) {
      return undefined;
    }
    if (decimals.loading || symbol.loading || tokenName.loading) {
      return null;
    }
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token'),
      );
    }
    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ]);
}

export function useTokenEx(tokenAddress?: string): Token | undefined | null {
  const { chainId, account, library } = useActiveWeb3React();

  const token = useToken(tokenAddress);

  const [exToken, setExToken] = useState(token);

  useEffect(() => {
    if (token?.name?.includes('LP ') && account && library) {
      getLpTokenByAddress(token.address, chainId, account, library).then(lpToken => {
        setExToken(lpToken);
      });
    }
  }, [token, chainId, account, library]);

  return exToken;
}

export function useCurrency(currencyId: string | undefined): Token | null | undefined {
  const { chainId } = useActiveWeb3React();
  const networkData = useNetworkData();
  const isEthActive = useIsEthActive();

  // @ts-ignore // todo: fix it
  const isESW = currencyId?.toUpperCase() === window['env'].REACT_APP_ESW_ID?.toUpperCase();
  const defaultCoin = useDefaultCoin(currencyId);
  const isETH = currencyId?.toUpperCase() === ETHER.address.toUpperCase();
  const token = useToken(isESW || isETH ? undefined : currencyId);

  const ether = new Token(chainId || 1, ZERO_ADDRESS, 18, 'ETH', 'Ethereum');

  // @ts-ignore
  const ethereumOrKcsCoin = isEthActive ? ether : networkData.token;

  return isESW ? defaultCoin : isETH ? ethereumOrKcsCoin : token;
}
