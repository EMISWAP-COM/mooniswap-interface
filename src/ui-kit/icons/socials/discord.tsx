import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const DiscordIcon: FC<IconWrapperInterface> = ({
  width = 4,
  height = 4,
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width} color={color}>
    <g clip-path="url(#clip0_1468_25777)">
      <path
        d="M17.2174 1.56471C15.4783 0.247059 12.7391 0 12.6522 0C12.4783 0 12.3043 0.082353 12.2174 0.247059C12.1739 0.370588 12.1304 0.452941 12.087 0.576471C13.2174 0.741176 14.6522 1.11176 15.913 1.89412C16.087 2.01765 16.1739 2.26471 16.0435 2.47059C15.913 2.67647 15.6522 2.71765 15.4348 2.59412C13.2609 1.31765 10.5217 1.23529 10 1.23529C9.47826 1.23529 6.73913 1.31765 4.56522 2.59412C4.34783 2.71765 4.08696 2.63529 3.95652 2.47059C3.82609 2.26471 3.91304 2.01765 4.08696 1.89412C5.34783 1.15294 6.78261 0.782353 7.91304 0.576471C7.82609 0.370588 7.78261 0.247059 7.78261 0.247059C7.69565 0.082353 7.52174 0 7.34783 0C7.21739 0 4.47826 0.247059 2.73913 1.56471C1.82609 2.38824 0 7.08235 0 11.1176C0 11.2 0 11.2412 0.0434783 11.3235C1.30435 13.4235 4.78261 13.9588 5.56522 14C5.69565 14 5.82609 13.9176 5.91304 13.8353L6.69565 12.8059C4.56522 12.2706 3.43478 11.4059 3.3913 11.3235C3.21739 11.1588 3.17391 10.9118 3.34783 10.7471C3.52174 10.5824 3.78261 10.5412 3.95652 10.7059C4 10.7471 6 12.3529 9.95652 12.3529C13.913 12.3529 15.9565 10.7059 15.9565 10.7059C16.1304 10.5412 16.3913 10.5824 16.5652 10.7471C16.7391 10.9118 16.6957 11.1588 16.5217 11.3235C16.4783 11.3647 15.3478 12.2706 13.2174 12.8059L14 13.8353C14.087 13.9588 14.2174 14 14.3478 14C15.1304 13.9588 18.5652 13.4235 19.8696 11.3235C20 11.2412 20 11.2 20 11.1176C20 7.08235 18.1739 2.38824 17.2174 1.56471ZM7.17391 9.47059C6.34783 9.47059 5.65217 8.72941 5.65217 7.82353C5.65217 6.91765 6.34783 6.17647 7.17391 6.17647C8 6.17647 8.69565 6.91765 8.69565 7.82353C8.69565 8.72941 8 9.47059 7.17391 9.47059ZM12.8261 9.47059C12 9.47059 11.3043 8.72941 11.3043 7.82353C11.3043 6.91765 12 6.17647 12.8261 6.17647C13.6522 6.17647 14.3478 6.91765 14.3478 7.82353C14.3478 8.72941 13.6522 9.47059 12.8261 9.47059Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1468_25777">
        <rect width="20" height="14" fill="white" />
      </clipPath>
    </defs>
  </IconWrapper>
);