const liquidityTokensMap = {
  // Dev
  '0x25356d68645692d1D456314728Cab21c283B1f47': '0x1c879c2681Cb1c63F6CEBc11A5F2B65Fc8AD23ba',
  '0x592eFD7A7d85b1D592c76d9a80D53f6a5db41c76': '0x1c879c2681Cb1c63F6CEBc11A5F2B65Fc8AD23ba',
  '0x6474fb64340837E1CCCbB1Bb4E0086081f3FdeB9': '0x1c879c2681Cb1c63F6CEBc11A5F2B65Fc8AD23ba',
  '0x14C22660fD7CB44843bC3158fce58951AcABb7B1': '0x1c879c2681Cb1c63F6CEBc11A5F2B65Fc8AD23ba',
  '0x24e7eB9874922726A8d8f277EF1c3Ad4a3Ab4eD1': '0x1c879c2681Cb1c63F6CEBc11A5F2B65Fc8AD23ba',

  // Prod
  '0xd9ca818d8db735fde245afaf55821ed7fa582d6c': '0x6b175474e89094c44da98b954eedeac495271d0f',
  '0x673f7a16B2d696A987383921292e8f46DA715952': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x0607C72267a160Edcf5151cd38d832C524817b6c': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xb7282ff5e0abe11446a327f799180d5c9a444fc7': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xeccd43cab1ef8619e11cdc04f82e0db2b90a7dbe': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x18caa4b61f116cf98ba1ebb12b53003fecc5767d': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x127ec35743e0c8a2a233d0b9899200b7ef58eaf5': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x501a4F720A911e2898228aCb4D6CB6D76EcE2Ec8': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x54B49CE39d95D5A4C6515d6000e1712D34410F3B': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xe094E3E16e813a40E2d6cC4b89bfeAe0142044e1': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x27a9c2033bdfB221e1F07F6e5F07eF59810F7431': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x91a97dDEa63A9E35b96c185a320f4606e77b6b7f': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',

  // KuCoin
  '0x8667dcf5498bEFBBFd7faEA7FD70F704f5A75685': '0x4446fc4eb47f2f6586f9faab68b3498f86c07521',

  // Mumbai
  '0xA87c488c7d562e2D18F629275C9A345F3094d560': '0x37e103a3BFabC8Fb542BA24C7e4594E5534806A3',
}



const getFarmingLiquidityTokenAddress = (farmContractAddress: string): string => {
  return liquidityTokensMap[farmContractAddress] || '';
}

export default getFarmingLiquidityTokenAddress;
