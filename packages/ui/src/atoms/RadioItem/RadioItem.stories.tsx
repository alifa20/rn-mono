import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { RadioItem } from './RadioItem';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof RadioItem> = {
  title: 'ATOMS/RadioItem',
  args: {
    label: 'RadioItem',
    onValueChange: () => {}
  }
};

export default meta;

export const _RadioItem: ComponentStory<typeof RadioItem> = props => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Box>
      <Text>Unselected</Text>
      <RadioItem {...props} />
      <Text>Selected</Text>
      <RadioItem {...props} selected />
      <Text>Disabled </Text>
      <RadioItem {...props} disabled />

      <Text>Controlled</Text>
      <RadioItem
        {...props}
        selected={selected}
        onValueChange={() => {
          setSelected(true);
        }}
      />
    </Box>
  );
};

export const _RadioItemSmall: ComponentStory<typeof RadioItem> = props => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Box>
      <Text>Unselected</Text>
      <RadioItem {...props} size='small' />
      <Text>Selected</Text>
      <RadioItem {...props} selected size='small' />
      <Text>Disabled </Text>
      <RadioItem {...props} disabled size='small' />

      <Text>Controlled</Text>
      <RadioItem
        {...props}
        selected={selected}
        onValueChange={() => {
          setSelected(true);
        }}
        size='small'
      />
    </Box>
  );
};

export const _RadioItemLarge: ComponentStory<typeof RadioItem> = props => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Box>
      <Text>Unselected</Text>
      <RadioItem {...props} size='large' />
      <Text>Selected</Text>
      <RadioItem {...props} selected size='large' />
      <Text>Disabled </Text>
      <RadioItem {...props} disabled size='large' />

      <Text>Controlled</Text>
      <RadioItem
        {...props}
        selected={selected}
        onValueChange={() => {
          setSelected(true);
        }}
        size='large'
      />
    </Box>
  );
};
