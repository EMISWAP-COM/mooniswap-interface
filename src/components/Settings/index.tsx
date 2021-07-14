import React, { useRef, useEffect, useContext, useState } from 'react';
import { Settings, X } from 'react-feather';
import styled from 'styled-components';

import {
  useUserSlippageTolerance,
  useExpertModeManager,
  useUserDeadline,
} from '../../state/user/hooks';
import SlippageTabs from '../SlippageTabs';
import { RowFixed, RowBetween } from '../Row';
import { TYPE } from '../../theme';
import QuestionHelper from '../QuestionHelper';
import Toggle from '../Toggle';
import { ThemeContext } from 'styled-components';
import { AutoColumn } from '../Column';
import { ButtonError } from '../Button';
import { useSettingsMenuOpen, useToggleSettingsMenu } from '../../state/application/hooks';
import { Text } from 'rebass';
import Modal from '../Modal';
import Option from '../WalletModal/Option';

const StyledMenuIcon = styled(Settings)`
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.white};
  }
`;

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.whiteTransparent};
  margin: 0;
  padding: 0;
  height: 40px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  padding: 0.15rem 0.625rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    border-color: ${({ theme }) => theme.purple};
  }
`;
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
`;

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

const MenuFlyout = styled.span`
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.dark1BoxShadow};

  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 18.125rem;
    right: -46px;
  `};
`;

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;

const langNameMap = {
  de: 'German',
  en: 'English',
  'es-AR': 'Spanish (Argentina)',
  'es-US': 'Spanish',
  'it-IT': 'Italian',
  iw: 'Hebrew',
  ro: 'Romanian',
  ru: 'Russian',
  vi: 'Vietnamese',
  'zh-CN': 'Chinese (PRC)',
  'zh-TW': 'Chinese (Taiwan)',
};

function getLangOptions() {
  const langList = [
    { code: 'en', color: '#315CF5', iconName: 'en.svg' },
    { code: 'de', color: '#315CF5', iconName: 'de.svg' },
    { code: 'es-AR', color: '#315CF5', iconName: 'es-AR.svg' },
    { code: 'es-US', color: '#315CF5', iconName: 'es-US.svg' },
    { code: 'it-IT', color: '#315CF5', iconName: 'it-IT.svg' },
    { code: 'iw', color: '#315CF5', iconName: 'iw.svg' },
    { code: 'ro', color: '#315CF5', iconName: 'ro.svg' },
    { code: 'ru', color: '#315CF5', iconName: 'ru.svg' },
    { code: 'vi', color: '#315CF5', iconName: 'vi.svg' },
    { code: 'zh-CN', color: '#315CF5', iconName: 'zh-CN.svg' },
    { code: 'zh-TW', color: '#315CF5', iconName: 'zh-TW.svg' },
  ];

  const selectedLangCode = window.localStorage.getItem('i18nextLng');

  return langList.map(option => {
    return (
      <Option
        id={`connect-${option.code}`}
        onClick={() => {
          window.localStorage.setItem('i18nextLng', option.code);
          window.location.reload();
        }}
        key={option.code}
        active={option.code === selectedLangCode}
        color={option.color}
        // link={option.href}
        header={langNameMap[option.code]}
        subheader={null} //use option.descriptio to bring back multi-line
        icon={require('../../assets/flags/' + option.iconName)}
      />
    );
  });
}

export default function SettingsTab() {
  const node = useRef<HTMLDivElement>();
  const open = useSettingsMenuOpen();
  const toggle = useToggleSettingsMenu();

  const theme = useContext(ThemeContext);
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance();

  const [deadline, setDeadline] = useUserDeadline();

  const [expertMode, toggleExpertMode] = useExpertModeManager();

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showLangDialog, setShowLangDialog] = useState(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current?.contains(e.target)) {
        return;
      }
      toggle();
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, toggle]);

  return (
    <StyledMenu ref={node}>
      <Modal isOpen={showLangDialog} onDismiss={() => setShowLangDialog(false)} maxHeight={80}>
        <ModalContentWrapper style={{ width: '100%' }}>
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <RowBetween style={{ padding: '0 2rem' }}>
              <div />
              <Text fontWeight={500} fontSize={20}>
                Select Language
              </Text>
              <StyledCloseIcon onClick={() => setShowLangDialog(false)} />
            </RowBetween>
            <Break />
            <div style={{ overflow: 'auto', height: 500 }}>
              <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
                <OptionGrid>{getLangOptions()}</OptionGrid>
              </AutoColumn>
            </div>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>

      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <RowBetween style={{ padding: '0 2rem' }}>
              <div />
              <Text fontWeight={500} fontSize={20}>
                Are you sure?
              </Text>
              <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
            </RowBetween>
            <Break />
            <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
              <Text fontWeight={500} fontSize={20}>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades
                that often result in bad rates and lost funds.
              </Text>
              <Text fontWeight={600} fontSize={20}>
                ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
              </Text>
              <ButtonError
                error={true}
                padding={'12px'}
                onClick={() => {
                  if (
                    window.prompt(`Please type the word "confirm" to enable expert mode.`) ===
                    'confirm'
                  ) {
                    toggleExpertMode();
                    setShowConfirmation(false);
                  }
                }}
              >
                <Text fontSize={20} fontWeight={500}>
                  Turn On Expert Mode
                </Text>
              </ButtonError>
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
        {expertMode && (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        )}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text color={theme.white} fontWeight={600} fontSize={14}>
              Transaction Settings
            </Text>
            <SlippageTabs
              rawSlippage={userSlippageTolerance}
              setRawSlippage={setUserslippageTolerance}
              deadline={deadline}
              setDeadline={setDeadline}
            />

            <Text fontWeight={600} fontSize={14} color={theme.white}>
              Interface Settings
            </Text>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.darkWhite}>
                  Toggle Expert Mode
                </TYPE.black>
                <QuestionHelper text="Bypasses confirmation modals and allows high slippage trades. Use at your own risk." />
              </RowFixed>
              <Toggle
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                        toggleExpertMode();
                        setShowConfirmation(false);
                      }
                    : () => {
                        toggle();
                        setShowConfirmation(true);
                      }
                }
              />
            </RowBetween>
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
