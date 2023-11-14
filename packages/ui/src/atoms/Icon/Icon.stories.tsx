import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Icon } from './Icon';
import { Box } from '../Box';

const meta: Meta<typeof Icon> = {
  title: 'ATOMS/Icon',
  args: {
    label: 'Icon',
    onValueChange: () => {}
  }
};

export default meta;

export const _Icon: ComponentStory<typeof Icon> = () => {
  return (
    <Box>
      <Icon iconType='antdesign' iconName='save' />
    </Box>
  );
};
