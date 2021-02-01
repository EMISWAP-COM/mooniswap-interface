import React, { useEffect } from 'react'
import styled from 'styled-components';
import { ExternalLink } from '../../../theme';
import { injected, walletlink } from '../../../connectors';
import { getEtherscanLink, shortenAddress } from '../../../utils';
import { ExternalLink as LinkIcon } from 'react-feather';
import { convertBigDecimal, formatConnectorName } from '../uitls'
import { useActiveWeb3React } from '../../../hooks';
import Copy from '../Copy';
import { StatusIcon } from '../StatusIcon';
import { PurchaseHistory } from '../Common/PurchaseHistory'
import { ReferalPerformance } from '../Common/ReferalPerformance'
import { WalletAction} from '../styleds'
import {
  loadBalance,
  loadPerformance,
  loadPurchaseHistory,
  loadReferralPurchaseHistory
} from '../../../state/cabinets/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../../state'
import { ESWPerformance } from '../Common/ESWPerformance'
import { ESWStats } from '../Common/ESWStats'


const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const InfoCard = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 12px;
  margin-bottom: 20px;

  @media screen and (max-width: 1200px) {
    border-radius: 5px;
}
`;

const AccountGroupingRow = styled.div`
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountControl = styled.div`
  display: flex;
  min-width: 0;
  height: 100%;
  font-weight: 450;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const ProfileStatus = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: capitalize;
  padding: 0 1rem 1rem 1rem;
  flex-wrap: wrap;
  align-items:
  gap: 12px;

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }

  span {
    color: #000000;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const Package = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;  

  @media screen and (max-width: 1200px) {
     flex-direction: column;
  }
`;

const BalanceContainer = styled.div`
  grid-row: span 2; 
  //
  // @media screen and (max-width: 1200px) {
  //    flex-direction: column;
  // }
`;

const Balance = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media screen and (max-width: 1200px) {
     flex-direction: row
     justify-content: space-between;
  }
  
  span:nth-child(1) {
    font-size: min(1rem, 4vw);
  }
`;

const BalanceFigure = styled.span`
    font-size: min(2rem, 4vw);
    font-weight: 600;
`;

const BalancePromo = styled.div`
    font-size: min(0.9rem, 3vw);
    font-weight: 600;
    color: #e50606;
`;

interface Props {
  // toggleWalletModal: () => void;
  // pendingTransad
  ENSName?: string;
  openOptions: () => void;
}

const Ambassador: React.FC<Props> = ({ openOptions, ENSName }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { chainId, account, connector } = useActiveWeb3React();

  const {id: userId } = useSelector((state: AppState) => state.user.info)
  const balance = useSelector((state: AppState) => state.cabinets.balance)


  useEffect(() => {
    dispatch(loadPerformance(userId) as any)
    dispatch(loadPurchaseHistory(userId) as any)
    dispatch(loadReferralPurchaseHistory(userId) as any)
    dispatch(loadBalance(userId) as any)
  }, [dispatch, userId]);

  return (
    <Wrapper>
      <ProfileStatus>
        <div>
          Status: <span>Ambassador</span>
        </div>
        <Package>
          <div>
            Level: <span>{'Rookie_mock'}</span>
          </div>
        </Package>
      </ProfileStatus>
      <TableWrapper>
        <InfoCard>
          <div>
            <AccountGroupingRow>
              <div>
                <span>connected with {formatConnectorName(connector)}</span>

                {connector !== injected && connector !== walletlink && (
                  <WalletAction
                    style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                    onClick={() => {
                      (connector as any).close();
                    }}
                  >
                    Disconnect
                  </WalletAction>
                )}
                <WalletAction
                  style={{ fontSize: '.825rem', fontWeight: 400 }}
                  onClick={() => {
                    openOptions();
                  }}
                >
                  Change
                </WalletAction>
              </div>
            </AccountGroupingRow>
            <AccountGroupingRow id="web3-account-identifier-row">
              <AccountControl>
                <div>
                  <StatusIcon connectorName={connector} />
                  <p>{ENSName || shortenAddress(account)}</p>
                </div>
              </AccountControl>
            </AccountGroupingRow>
          </div>
          <BalanceContainer>
            <BalanceWrapper>
              <Balance>
                <span>
                  your &nbsp;
                  <span>ESW</span>
                  &nbsp; balance
                </span>

                <BalanceFigure>{convertBigDecimal(balance.amount)}</BalanceFigure>
              </Balance>
              <Balance>
                <span>
                  Referral Purchases
                </span>

                <BalanceFigure>{convertBigDecimal(undefined)}</BalanceFigure>
              </Balance>
            </BalanceWrapper>
            <BalancePromo>
            </BalancePromo>
          </BalanceContainer>
          <AccountGroupingRow>
            <AccountControl>
              <Copy toCopy={account}>
                <span style={{ marginLeft: '4px' }}>Copy Address</span>
              </Copy>
              <AddressLink href={getEtherscanLink(chainId, ENSName || account, 'address')}>
                <LinkIcon size={16} />
                <span style={{ marginLeft: '4px' }}>View on Etherscan</span>
              </AddressLink>
            </AccountControl>
          </AccountGroupingRow>
        </InfoCard>
        <ReferalPerformance/>
        <PurchaseHistory/>
        <ESWPerformance/>
        <ESWStats />
      </TableWrapper>
    </Wrapper>
  );
};

export { Ambassador };