import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { NavigationItem } from './NavigationItem';
import { Box } from '../../Box';

const meta: Meta<typeof NavigationItem> = {
  title: 'ATOMS/NavigationItem',
  args: {
    label: 'NavigationItem',
    onValueChange: () => {}
  }
};

export default meta;

export const _NavigationItem: ComponentStory<typeof NavigationItem> = props => {
  return (
    <Box gap='s'>
      <Box>
        <NavigationItem {...props} />
      </Box>
    </Box>
  );
};
