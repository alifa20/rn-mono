import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Checkbox } from './Checkbox';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof Checkbox> = {
  title: 'ATOMS/Checkbox',
  args: {
    label: 'Checkbox',
    onValueChange: () => {}
  }
};

export default meta;

export const _Checkbox: ComponentStory<typeof Checkbox> = props => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box>
      <Text>Unchecked</Text>
      <Checkbox {...props} />
      <Text>Checked</Text>
      <Checkbox {...props} checked />
      <Text>Disabled </Text>
      <Checkbox {...props} disabled />

      <Text>Controlled</Text>
      <Checkbox {...props} checked={checked} onValueChange={setChecked} />
    </Box>
  );
};
