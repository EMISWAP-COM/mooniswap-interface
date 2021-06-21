import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonOutlined, ButtonPrimary } from '../../components/Button';
import { useActiveWeb3React } from '../../hooks'
import { AppState } from '../../state'
import InvestContactForm from '../../components/InvestContactForm'
import { LoginFirstText, OnlyInvestorsText, PrivateSaleText } from './styleds'
import { InvestRequestStatus } from '../../state/user/reducer'

export const InvestRules = () => {
  const { account } = useActiveWeb3React();
  const investRequestStatus = useSelector((state: AppState) => state.user.info?.invest_request_state);
  const [isRegisterWaitListModalOpen, setIsRegisterWaitListModalOpen] = useState<boolean>(false);

  const getMessage = () => {

    switch (investRequestStatus) {
      case InvestRequestStatus.PENDING:
        return 'You’re already registered in the Waiting list. ESW token sales will start on June, 28 14:00 UTC.';
      case InvestRequestStatus.SENT:
        return 'We have received your Private sale’s Waiting List request. Our team will contact you soon.';
      case InvestRequestStatus.REJECTED:
        return 'Sorry, your candidacy was rejected on the Private sale’s Waiting List. However, you will be able to invest on Launchpads. Stay tuned!';
      case InvestRequestStatus.ACCEPTED:
        return 'Great, your candidacy has been accepted on the Private sale’s Waiting List! Now you can invest in ESW through the EmiSwap website';
      default:
        return 'Sorry, only investors registered in the Waiting list and confirmed can invest in the Private Stage';
    }
  };

  return (
    <>
      <PrivateSaleText>
        To join launchpad sales on June, 28 14:00 UTC you need to register for the Waiting list.
      </PrivateSaleText>
      {!account ? (
        <LoginFirstText>
          Only Waiting list participants will be able to buy ESW.
        </LoginFirstText>
      ): (
        <OnlyInvestorsText>
          {getMessage()}
        </OnlyInvestorsText>
      )}
      {!investRequestStatus && (
        <div style={{marginTop: 24}}>
          <ButtonOutlined onClick={() => setIsRegisterWaitListModalOpen(true)}>
            Register to the Waiting list
          </ButtonOutlined>
          <InvestContactForm
            isOpen={isRegisterWaitListModalOpen}
            walletID={account}
            onDismiss={() => setIsRegisterWaitListModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};
