import React from 'react';
import { convertBigDecimal, formatConnectorName } from '../uitls';
import { WalletAction } from '../styleds';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';
import { StatusIcon } from '../StatusIcon';
import { getExplorerLink, shortenAddress } from '../../../utils';
import { useHistory } from 'react-router';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { ExternalLink as LinkIcon } from 'react-feather';
import Copy from '../Copy';
import { ExternalLink } from '../../../theme';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { darken } from 'polished';
import { ChangeAddress } from './ChangeAddress';
import { useIsEthActive, useIsKuCoinActive, useNetworkData } from '../../../hooks/Coins';
import { MessageTooltip } from '../../../base/ui';
import { css } from 'styled-components';

const Container = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 12px;

  @media screen and (max-width: 1200px) {
    border-radius: 8px;
  }
`;

const Main = styled.div`
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }
`;

const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
`;

const Account = styled(DarkText)`
  font-size: 22px;
`;

const WalletInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const Wallet = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const BalanceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

const BalanceItem = styled.div`
  padding: 14px;
  background: ${({ theme }) => theme.darkGrey};
`;
const BalanceValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

const ChangeActionsBlock = styled.div`
  display: flex;

  @media screen and (max-width: 800px) {
    order: 2;
    width: 100%;
    margin: 8px 0 16px 0;
  }
`;

const ChangeWalletMessageTooltip = styled(MessageTooltip)`
  max-width: 400px !important;

  &:before {
    display: none;
  }
`;

const ChangeWalletBtn = styled(ActionBtn)<{ inactive: boolean }>`
  margin-left: 8px !important;
  background-color: ${({ theme }) => theme.purple} !important;
  border: 1px solid ${({ theme }) => theme.purple} !important;
  color: ${({ inactive }) => (inactive ? '#615C69' : '#FFFFFF')};

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme, inactive }) => (inactive ? 'transparent' : theme.purple)} !important;
    box-shadow: none;
  }

  ${({ inactive }) => inactive && css`
    background-color: transparent !important;
    color: #615C69;
    cursor: auto;
    border: 1px solid rgb(97, 92, 105) !important;
    opacity: 1 !important;
    text-decoration: none !important;
  `} @media screen and(max-width: 800 px) {
  width: calc(50% - 5px);
  margin-left: auto;
}
`;

const CollectBtn = styled(ActionBtn)`
  min-width: 180px;
  margin-bottom: 10px;
`;

const AccountControl = styled.div`
  display: flex;
  height: 53px;
  font-weight: 400;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.darkGrey};

  a:hover {
    text-decoration: underline;
  }

  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }

  button {
    padding: 0;

    span {
      margin-left: 0;
    }
  }
`;

const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.blue};
  margin-left: 1rem;
  display: flex;

  :hover {
    color: ${({ theme }) => darken(0.3, theme.blue)};
  }
`;

interface Props {
  ENSName?: string;
  openOptions: () => void;
}

export const Connection: React.FC<Props> = ({ openOptions, ENSName, children }) => {
  const { chainId, account, connector } = useActiveWeb3React();
  const { blockExplorerName } = useNetworkData();

  const history = useHistory();
  const toggle = useWalletModalToggle();

  const isEthereumActive = useIsEthActive();
  const isKuCoinActive = useIsKuCoinActive();
  const isEnableChangeWallet = !isKuCoinActive;

  const balance = useSelector((state: AppState) => state.cabinets.balance);

  const isCollectDisabled = true || !Number(balance?.available.ESW);

  const sumESW = () => {
    const walletESW = balance?.wallet.ESW || 0;
    const availableESW = balance?.available.ESW || 0;
    const lockedESW = balance?.total.locked.ESW || 0;

    const sum = Number(walletESW) + Number(availableESW) + Number(lockedESW);

    return convertBigDecimal(sum.toString());
  };

  const handleChangeWallet = () => {
    if (!isEnableChangeWallet) {
      return;
    }

    openOptions();
  };

  const handleClaim = () => {
    toggle();
    history.push('/claim/ESW');
  };

  return (
    <>
      <Container>
        <Main>
          <WalletInfo>
            <span>Connected with {formatConnectorName(connector)}</span>
            <ChangeActionsBlock>
              <ChangeAddress openOptions={openOptions}/>
              <ChangeWalletMessageTooltip
                disableTooltip={isEnableChangeWallet}
                whiteSpace={'normal'}
                position={{ top: '4px', left: '284px' }}
                text="Only Metamask wallet is supported. You need to change the address inside the Metamask wallet."
              >
                <ChangeWalletBtn inactive={!isEnableChangeWallet} onClick={handleChangeWallet}>
                  Change wallet
                </ChangeWalletBtn>
              </ChangeWalletMessageTooltip>
            </ChangeActionsBlock>
            <Wallet>
              <StatusIcon connectorName={connector}/>
              <Account>{ENSName || shortenAddress(account)}</Account>
            </Wallet>
          </WalletInfo>

          {isEthereumActive && (
            <>
              <BalanceWrapper>
                <BalanceItem>
                  <span>Total</span>
                  <div>
                    <BalanceValue>{sumESW()}</BalanceValue>&nbsp;ESW
                  </div>
                </BalanceItem>
                <BalanceItem>
                  <span>Wallet</span>
                  <div>
                    <BalanceValue>{convertBigDecimal(balance?.wallet.ESW)}</BalanceValue>&nbsp;ESW
                  </div>
                </BalanceItem>
                <BalanceItem>
                  <span>Locked at Emiswap </span>
                  <div>
                    <BalanceValue>{convertBigDecimal(balance?.total.locked.ESW)}</BalanceValue>
                    &nbsp;ESW
                  </div>
                  {' '}
                </BalanceItem>
                <BalanceItem>
                  <span>Available to collect</span>
                  <div>
                    <BalanceValue>{convertBigDecimal(balance?.available.ESW)}</BalanceValue>
                    &nbsp;ESW
                  </div>
                  {' '}
                </BalanceItem>
              </BalanceWrapper>
              <Options>
                {children}
                <MessageTooltip
                  disableTooltip={!isCollectDisabled}
                  whiteSpace={'normal'}
                  position={{ top: '175px', left: '485px' }}
                  text="Temporarily unavailable"
                >
                  <CollectBtn disabled={isCollectDisabled} onClick={handleClaim}>
                    Collect to my wallet
                  </CollectBtn>
                </MessageTooltip>
              </Options>
            </>
          )}
        </Main>
        <AccountControl>
          <Copy toCopy={account}>
            <span style={{ marginLeft: '4px' }}>Copy Address</span>
          </Copy>
          <AddressLink
            href={getExplorerLink(chainId, ENSName || account, 'address')}
          >
            <LinkIcon size={16}/>
            <span style={{ marginLeft: '4px' }}>
              View on {blockExplorerName}
            </span>
          </AddressLink>
        </AccountControl>
      </Container>
    </>
  );
};
