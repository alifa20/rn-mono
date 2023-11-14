import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { CheckItem } from './CheckItem';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof CheckItem> = {
  title: 'ATOMS/CheckItem',
  args: {
    label: 'CheckItem',
    onValueChange: () => {}
  }
};

export default meta;

export const _CheckItem: ComponentStory<typeof CheckItem> = props => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box>
      <Text>Unchecked</Text>
      <CheckItem {...props} />
      <Text>Checked</Text>
      <CheckItem {...props} checked />
      <Text>Disabled </Text>
      <CheckItem {...props} disabled />

      <Text>Controlled</Text>
      <CheckItem {...props} checked={checked} onValueChange={setChecked} />
    </Box>
  );
};

export const _CheckItemSmall: ComponentStory<typeof CheckItem> = props => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box>
      <Text>Unchecked</Text>
      <CheckItem {...props} size='small' />
      <Text>Checked</Text>
      <CheckItem {...props} checked size='small' />
      <Text>Disabled </Text>
      <CheckItem {...props} disabled size='small' />

      <Text>Controlled</Text>
      <CheckItem
        {...props}
        checked={checked}
        onValueChange={setChecked}
        size='small'
      />
    </Box>
  );
};

export const _CheckItemLarge: ComponentStory<typeof CheckItem> = props => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box>
      <Text>Unchecked</Text>
      <CheckItem {...props} size='large' />
      <Text>Checked</Text>
      <CheckItem {...props} checked size='large' />
      <Text>Disabled </Text>
      <CheckItem {...props} disabled size='large' />

      <Text>Controlled</Text>
      <CheckItem
        {...props}
        checked={checked}
        onValueChange={setChecked}
        size='large'
      />
    </Box>
  );
};
