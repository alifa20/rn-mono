import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { Tag } from './Tag';
import { Box } from '../../atoms';

const meta: Meta<typeof Tag> = {
  title: 'ATOMS/Tag',
  args: {}
};

export default meta;

export const _Tag: ComponentStory<typeof Tag> = () => {
  return (
    <Box gap={'s'} width={100}>
      <Tag amount={50} />
      <Tag amount={50} type='amount' />
    </Box>
  );
};
