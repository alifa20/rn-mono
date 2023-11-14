import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { SectionItem } from './SectionItem';
import { Box } from '../../Box';

const meta: Meta<typeof SectionItem> = {
  title: 'ATOMS/SectionItem',
  args: {
    label: 'SectionItem',
    onValueChange: () => {}
  }
};

export default meta;

export const _SectionItem: ComponentStory<typeof SectionItem> = props => {
  return (
    <Box gap='s'>
      <Box>
        <SectionItem {...props} />
      </Box>
    </Box>
  );
};
