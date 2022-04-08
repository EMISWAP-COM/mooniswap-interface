import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const FacebookIcon: FC<IconWrapperInterface> = ({
  width = 4,
  height = 4,
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width} color={color}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 10.0604C20 4.50473 15.5223 0 10 0C4.47768 0 0 4.50473 0 10.0604C0 15.0816 3.65625 19.2437 8.4375 19.9991V12.9694H5.89777V10.0604H8.4375V7.84397C8.4375 5.32303 9.9308 3.9294 12.2147 3.9294C13.3089 3.9294 14.4536 4.12611 14.4536 4.12611V6.60214H13.192C11.9504 6.60214 11.5621 7.37733 11.5621 8.17408V10.0604H14.3353L13.8924 12.9694H11.5625V20C16.3438 19.245 20 15.083 20 10.0604Z"
      fill="white"
    />
  </IconWrapper>
);