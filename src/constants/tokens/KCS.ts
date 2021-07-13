import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

const getKcsToken = (chainId: any) => {
  return new Token(chainId || chainIds.KUCOIN, ZERO_ADDRESS, 18, 'KCS', 'KCS');
};

export default getKcsToken;
