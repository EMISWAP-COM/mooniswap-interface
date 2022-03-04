import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { useFirstToken, useTokenListFrom } from './hooks';
import {
  selectAmountFromToken,
  selectFromToChains,
  selectFromToken,
  setAmountFromToken,
  setFromToken,
} from './slice';
import TokenInput from './TokenInput';
import { Token } from './types';

const FromTokenInput = () => {
  const fromToken = useAppSelector(selectFromToken);
  const amount = useAppSelector(selectAmountFromToken);
  const dispatch = useDispatch();
  const { fromChain } = useAppSelector(selectFromToChains);
  const { data: tokenList, isSuccess } = useTokenListFrom();
  const firstToken = useFirstToken(tokenList, fromChain?.chainId);

  const setToken = useCallback((value: Token) => dispatch(setFromToken(value)), [
    dispatch,
    setFromToken,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setToken(tokenList.find(({ name }) => name === fromToken?.name) || firstToken);
    }
  }, [tokenList]);

  return (
    <TokenInput
      tokens={isSuccess ? tokenList : 'loading'}
      token={fromToken}
      amount={amount}
      onAmountInput={(value: string) => dispatch(setAmountFromToken(value))}
      setToken={setToken}
      chainId={fromChain?.chainId}
      disableFilter={false}
    />
  );
};

export default FromTokenInput;
