import { createAction } from '@reduxjs/toolkit';
import { TokenList } from '@uniswap/token-lists';
import { ReactNode } from 'react';

export type PopupContent =
  | {
      txn: {
        hash: string;
        success: boolean;
        summary?: string;
      };
    }
  | {
      listUpdate: {
        listUrl: string;
        oldList: TokenList;
        newList: TokenList;
        auto: boolean;
      };
    }
  | {
      status: {
        name: string | ReactNode;
        isError: boolean;
        summary?: string | ReactNode;
      };
    };

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>(
  'updateBlockNumber',
);

export const showWalletModal = createAction<void>('showWalletModal');
export const toggleWalletModal = createAction<void>('toggleWalletModal');
export const toggleNewWalletModal = createAction<void>('toggleNewWalletModal');
export const toggleNetworkSwitchModal = createAction<void>('toggleNetworkSwitchModal');
export const toggleConfirmSwitchModal = createAction<void>('toggleConfirmSwitchModal');
export const toggleBridgeModal = createAction<void>('toggleBridgeModal');
export const toggleSettingsMenu = createAction<void>('toggleSettingsMenu');
export const addPopup = createAction<{ key?: string; content: PopupContent }>('addPopup');
export const removePopup = createAction<{ key: string }>('removePopup');
