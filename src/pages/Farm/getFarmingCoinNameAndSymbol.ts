const coinNamesMap = {
  '0x501a4F720A911e2898228aCb4D6CB6D76EcE2Ec8': {
    name: 'LP USDC-FLEX V2',
    symbol: 'USDCFLEXV2',
  },
  '0x24e7eB9874922726A8d8f277EF1c3Ad4a3Ab4eD1': {
    name: 'ESW-D',
    symbol: 'ESW-D',
  },
  '0xd9ca818d8db735fde245afaf55821ed7fa582d6c': {
    name: 'ESW V2',
    symbol: 'ESW V2',
  },
  '0x0607C72267a160Edcf5151cd38d832C524817b6c': {
    name: 'ESW - ETH',
    symbol: 'ESWETH',
  },
  '0xb7282ff5e0abe11446a327f799180d5c9a444fc7': {
    name: 'ESW - USDT',
    symbol: 'ESWUSDT',
  },
  'xeCCD43cab1Ef8619E11cDC04f82E0DB2B90A7dBe': {
    name: 'USDC - USDT',
    symbol: 'USDCUSDT',
  },
  '0x18CAa4B61F116cf98BA1Ebb12b53003fecC5767D': {
    name: 'USDT - BDQ',
    symbol: 'USDTBDQ',
  },
  '0x7449314B698f918E98c76279B5570613b243eECf': {
    name: 'Fixed ESW - BTC',
    symbol: 'ESWBTC',
  },
  '0x43053286b9c96DceA44e2b5c7cc12af6dD9612F2': {
    name: 'Fixed ESW - ETH',
    symbol: 'ESWETH',
  },
  '0x055330C14Aca2055CadbC93107C9beaB8Fb65f17': {
    name: 'Fixed ESW - USDT',
    symbol: 'ESWUSDT',
  },
  '0x6Edc79BCc58EB06E3F663F192A04B69CcCbCF247': {
    name: 'Fixed ESW - DAI',
    symbol: 'ESWDAI',
  },
};

// Use to override names from defaultCoins.ts only
const getFarmingCoinNameAndSymbol = (farmContractAddress: string): { name: string, symbol: string } => {
  return coinNamesMap[farmContractAddress] || {};
};

export default getFarmingCoinNameAndSymbol;