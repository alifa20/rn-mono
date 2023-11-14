import React from 'react';
import { IconButton, IconButtonProps } from '../IconButton';

type BackButtonProps = Omit<IconButtonProps, 'icon'>;

export const BackButton = (props: BackButtonProps) => {
  return (
    <IconButton
      {...props}
      icon={{
        iconName: 'ios-arrow-back-sharp',
        iconType: 'ionicons'
      }}
    />
  );
};
