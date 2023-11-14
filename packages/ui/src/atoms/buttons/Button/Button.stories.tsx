import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Button } from './Button';
import { Box } from '../../Box';
import { Text } from '../../Text';

const meta: Meta<typeof Button> = {
  title: 'ATOMS/Button',
  args: {
    label: 'Button',
    onPress: () => {}
  }
};

export default meta;

export const _Button: ComponentStory<typeof Button> = props => {
  return (
    <Box>
      <Text>Primary</Text>
      <Button {...props} variants='primary' />
      <Text>Secondary</Text>
      <Button {...props} variants='secondary' />
      <Text>Teriary</Text>
      <Button {...props} variants='tertiary' />
      <Text>Critical</Text>
      <Button {...props} variants='critical' />
      <Text>Outline</Text>
      <Button {...props} variants='outline' />
    </Box>
  );
};
