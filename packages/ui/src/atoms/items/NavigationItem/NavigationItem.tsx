import React from 'react';
import { SectionItem, SectionItemProps } from '../SectionItem';

export type NavigationItemProps = SectionItemProps;

export const NavigationItem = ({ ...props }: NavigationItemProps) => {
  return (
    <SectionItem
      {...props}
      suffixIcon={{
        icon: {
          iconName: 'chevron-right',
          iconType: 'feather'
        },
        disabled: true,
        ...props.suffixIcon
      }}
    />
  );
};
