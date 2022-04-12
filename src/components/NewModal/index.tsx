import React from 'react';
import styled, { css } from 'styled-components';
import { animated, useSpring, useTransition } from 'react-spring';
import { Spring } from 'react-spring/renderprops';

import { DialogContent, DialogOverlay } from '@reach/dialog';
import { isMobile } from 'react-device-detect';
import '@reach/dialog/styles.css';
import { useGesture } from 'react-use-gesture';

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(({ mobile, ...rest }) => <AnimatedDialogOverlay {...rest} />)<{
  mobile: boolean;
}>`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    overflow: hidden;

    ${({ mobile }) =>
      mobile &&
      css`
        align-items: flex-end;
      `}

    &::after {
      content: '';
      background-color: red;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: fixed;
      z-index: -1;
    }
  }
`;

// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(
  ({ width, minHeight, maxHeight, maxWidth, mobile, isOpen, ...rest }) => (
    <DialogContent {...rest} />
  ),
).attrs({
  'aria-label': 'dialog',
})`
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    border: 1px solid green;
    background-color: yellow;
    box-shadow: purple;
    padding: 0;
    overflow-x: scroll;
    overflow-y: visible;

    &::-webkit-scrollbar {
      display: none;
    }

    ${({ maxWidth }) =>
      maxWidth &&
      css`
        max-width: ${maxWidth}px;
      `}
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    width:  85vw;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  width?: string;
  minHeight?: number | false;
  maxHeight?: number;
  maxWidth?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  className?: string;
}

export default function NewModal({
  isOpen,
  onDismiss,
  width = '54wv',
  minHeight = false,
  maxHeight = 50,
  maxWidth = 440,
  initialFocusRef = null,
  children,
  className,
}: ModalProps) {
  const transitions = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }));
  const bind = useGesture({
    onDrag: state => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (state.velocity > 3 && state.direction[1] > 0) {
        onDismiss();
      }
    },
  });

  if (isMobile) {
    return (
      <>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <StyledDialogOverlay
                key={key}
                style={props}
                onDismiss={onDismiss}
                initialFocusRef={initialFocusRef}
                mobile={true}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {initialFocusRef ? null : <div tabIndex={1} />}
                <Spring // animation for entrance and exit
                  from={{
                    transform: isOpen ? 'translateY(200px)' : 'translateY(100px)',
                  }}
                  to={{
                    transform: isOpen ? 'translateY(0px)' : 'translateY(200px)',
                  }}
                >
                  {props => (
                    <animated.div
                      {...bind()}
                      style={{
                        transform: y.interpolate(y => `translateY(${y > 0 ? y : 0}px)`),
                      }}
                    >
                      <StyledDialogContent
                        aria-label="dialog content"
                        className={className}
                        style={props}
                        hidden={true}
                        width={width}
                        minHeight={minHeight}
                        maxHeight={maxHeight}
                        maxWidth={maxWidth}
                        mobile={isMobile}
                      >
                        {children}
                      </StyledDialogContent>
                    </animated.div>
                  )}
                </Spring>
              </StyledDialogOverlay>
            ),
        )}
      </>
    );
  } else {
    return (
      <>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <StyledDialogOverlay
                key={key}
                style={props}
                onDismiss={onDismiss}
                initialFocusRef={initialFocusRef}
              >
                <StyledDialogContent
                  aria-label="dialog content"
                  hidden={true}
                  width={width}
                  minHeight={minHeight}
                  maxHeight={maxHeight}
                  maxWidth={maxWidth}
                  isOpen={isOpen}
                  className={className}
                >
                  {children}
                </StyledDialogContent>
              </StyledDialogOverlay>
            ),
        )}
      </>
    );
  }
}
