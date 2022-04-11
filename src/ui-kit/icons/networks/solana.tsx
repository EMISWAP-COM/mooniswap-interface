import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const SolanaICON: FC<IconWrapperInterface> = ({
                                                    width = '32',
                                                    height = '32',
                                                    ...props
                                                  }): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path d="M10 19.9995C15.5228 19.9995 20 15.5224 20 9.99951C20 4.47666 15.5228 -0.000488281 10 -0.000488281C4.47715 -0.000488281 0 4.47666 0 9.99951C0 15.5224 4.47715 19.9995 10 19.9995Z" fill="white"/>
    <g clip-path="url(#clip0_1228_20885)">
      <path d="M5.94933 12.1053C6.02175 12.0437 6.12132 12.0078 6.22693 12.0078H15.804C15.979 12.0078 16.0665 12.1875 15.9428 12.2927L14.0509 13.9019C13.9785 13.9635 13.8789 13.9995 13.7733 13.9995H4.19625C4.02124 13.9995 3.93374 13.8198 4.05745 13.7146L5.94933 12.1053Z" fill="url(#paint0_linear_1228_20885)"/>
      <path d="M5.94933 6.09704C6.02476 6.03544 6.12434 5.99951 6.22693 5.99951H15.804C15.979 5.99951 16.0665 6.17917 15.9428 6.2844L14.0509 7.89364C13.9785 7.95524 13.8789 7.99117 13.7733 7.99117H4.19625C4.02124 7.99117 3.93374 7.81151 4.05745 7.70628L5.94933 6.09704Z" fill="url(#paint1_linear_1228_20885)"/>
      <path d="M14.0509 9.0819C13.9785 9.02031 13.8789 8.98438 13.7733 8.98438H4.19625C4.02124 8.98438 3.93374 9.16403 4.05745 9.26926L5.94933 10.8785C6.02175 10.9401 6.12132 10.976 6.22693 10.976H15.804C15.979 10.976 16.0665 10.7964 15.9428 10.6911L14.0509 9.0819Z" fill="url(#paint2_linear_1228_20885)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1228_20885" x1="14.8891" y1="5.03815" x2="9.79164" y2="16.5167" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FFA3"/>
        <stop offset="1" stop-color="#DC1FFF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1228_20885" x1="11.9909" y1="3.75116" x2="6.89348" y2="15.2297" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FFA3"/>
        <stop offset="1" stop-color="#DC1FFF"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1228_20885" x1="13.4308" y1="4.39052" x2="8.33333" y2="15.8691" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FFA3"/>
        <stop offset="1" stop-color="#DC1FFF"/>
      </linearGradient>
      <clipPath id="clip0_1228_20885">
        <rect width="12" height="8" fill="white" transform="translate(4 5.99951)"/>
      </clipPath>
    </defs>
  </IconWrapper>
);
