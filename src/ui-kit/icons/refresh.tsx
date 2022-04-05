import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const RefreshIcon: FC<IconWrapperInterface> = ({
  width = '24',
  height = '24',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="24">
    <path
      d="M10 19L9.29289 18.2929L8.58579 19L9.29289 19.7071L10 19ZM13.2929 14.2929L9.29289 18.2929L10.7071 19.7071L14.7071 15.7071L13.2929 14.2929ZM9.29289 19.7071L13.2929 23.7071L14.7071 22.2929L10.7071 18.2929L9.29289 19.7071Z"
      fill="currentColor"
    />
    <path
      d="M18.0622 8.5C18.6766 9.56413 19 10.7712 19 12C19 13.2288 18.6766 14.4359 18.0622 15.5C17.4478 16.5641 16.5641 17.4478 15.5 18.0622C14.4359 18.6766 13.2288 19 12 19"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M14 5L14.7071 5.70711L15.4142 5L14.7071 4.29289L14 5ZM10.7071 9.70711L14.7071 5.70711L13.2929 4.29289L9.29289 8.29289L10.7071 9.70711ZM14.7071 4.29289L10.7071 0.292893L9.29289 1.70711L13.2929 5.70711L14.7071 4.29289Z"
      fill="currentColor"
    />
    <path
      d="M5.93782 15.5C5.32344 14.4359 5 13.2288 5 12C5 10.7712 5.32344 9.56413 5.93782 8.5C6.5522 7.43587 7.43587 6.5522 8.5 5.93782C9.56413 5.32344 10.7712 5 12 5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </IconWrapper>
);
