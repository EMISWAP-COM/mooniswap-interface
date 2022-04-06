import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TelegramIcon: FC<IconWrapperInterface> = ({
  width = 4,
  height = 4,
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width} color={color}>
    <path
      d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM13.2 15.2C13.1 15.6 12.6 15.7 12.3 15.6H12.2L9.5 13.5L7.7 15C7.6 15.1 7.5 15.1 7.4 15L7.7 12V11.9C7.7 11.9 12.6 7.5 12.8 7.3C13.1 7.2 13 7.1 13 7.1C13 6.9 12.6 7.1 12.6 7.1L6.1 11.3L3.4 10.4C3.4 10.4 3 10.3 2.9 9.9C2.9 9.6 3.4 9.4 3.4 9.4L14.1 5.1C14.1 5.1 15 4.7 15 5.4L13.2 15.2Z"
      fill="white"
    />
  </IconWrapper>
);
