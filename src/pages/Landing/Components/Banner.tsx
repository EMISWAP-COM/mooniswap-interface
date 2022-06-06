import Web3Status from '../../../components/Web3Status';
import React, { ReactElement } from 'react';
import ReferralLink from 'components/RefferalLink';
import { TokenAddresses, tokens } from '../TokenAddresses';
import hackenSvg from '../../../assets/landing/header/hacken.svg';
import blueswarmSvg from '../../../assets/landing/header/blueswarm.svg';
import PieEn from '../../../assets/landing/PieEn.png';
import PieEs from '../../../assets/landing/PieEs.png';
import listDotSvg from '../../../assets/svg/list-dot.svg';
import listDotVioletSvg from '../../../assets/svg/list-dot-violet.svg';
import styled from 'styled-components';

interface Banner {
  aboutSectionRef: React.MutableRefObject<any>;
  account: string;
  t: any;
  currentLanguage: string;
  goToPool: () => void;
  changeChainToPolygon: () => void;
  toggleWalletModal: () => void;
}

const BannerDesc = styled.div`
  display: flex;
  align-items: center;
`;

const IconsWrapper = styled.div`
  display: inline-flex;
  gap: 0.25rem;
  margin-left: 1rem;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Banner = ({
  aboutSectionRef,
  account,
  t,
  currentLanguage,
  goToPool,
  changeChainToPolygon,
  toggleWalletModal,
}: Banner): ReactElement => (
  <section id="about" className="banner" ref={aboutSectionRef}>
    <div className="mobile-web3-buttons">
      <Web3Status disableClickOnConnected />
    </div>
    <div className="banner__info">
      <div className="banner__title">{t('landing.banner.title')}</div>
      <BannerDesc className="banner__desc">
        <span>{t('landing.banner.subtitle')}</span>
        <IconsWrapper>
          {tokens.map(item => (
            <img src={item.icon} alt="icon" />
          ))}
        </IconsWrapper>
      </BannerDesc>
      <div className="banner__buttons">
        <button
          className="btn-primary"
          onClick={() => {
            changeChainToPolygon();
            goToPool();
          }}
          style={{ flex: 1, padding: 0 }}
        >
          {t('landing.button.startEarning')}
        </button>

        {!account ? (
          <button className="btn-primary lp_btn-connect" onClick={toggleWalletModal}>
            {t('landing.button.connect-wallet')}
          </button>
        ) : (
          <ReferralLink
            showText={false}
            showIcon={false}
            text={t('landing.button.copy')}
            onCopyText={t('landing.button.onCopy')}
            className="lp_referral_button"
          />
        )}
      </div>
      <TokenAddresses />
      <div className="banner__audited">
        Audited by: <img src={hackenSvg} alt="" /> & <img src={blueswarmSvg} alt="" />
      </div>
    </div>
    <div className="chart">
      <div className="chart__pie">
        <img className="chart__pie-img" src={currentLanguage === 'es-US' ? PieEs : PieEn} alt="" />
      </div>
      <div className="chart__stats">
        <div className="chart__stat-item">
          <div className="chart__stat-name">
            <img className="chart__list-dot" src={listDotSvg} alt="" />
            {t('landing.banner.supply')}
          </div>
          <div className="chart__percent">365%</div>
        </div>
        <div className="chart__stat-item">
          <div className="chart__stat-name" style={{ color: '#7A2DF4' }}>
            <img className="chart__list-dot" src={listDotVioletSvg} alt="" />
            {t('landing.banner.farming')}
          </div>
          <div className="chart__percent-label">{t('landing.upTo')}</div>
          <div className="chart__percent">1000%</div>
        </div>
        <div className="chart__stat-item">
          <div className="chart__stat-name" style={{ color: '#E478FF' }}>
            <img className="chart__list-dot" src={listDotSvg} alt="" />
            {t('landing.banner.swap')}
          </div>
          <div className="chart__percent-label">{t('landing.banner.volume')}</div>
          <div className="chart__percent">0,25%</div>
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
