import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Divider } from './Divider';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof Divider> = {
  title: 'ATOMS/Divider',
  args: {
    label: 'Divider',
    onValueChange: () => {}
  }
};

export default meta;

export const _Divider: ComponentStory<typeof Divider> = props => {
  return (
    <Box gap='s'>
      <Box>
        <Text>Light</Text>
        <Divider {...props} thickness='light' />
      </Box>
      <Box>
        <Text>Medium</Text>
        <Divider {...props} thickness='medium' />
      </Box>
      <Box>
        <Text>heavy</Text>
        <Divider {...props} thickness='heavy' />
      </Box>
    </Box>
  );
};
