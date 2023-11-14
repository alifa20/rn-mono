import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { List } from './List';
import { Box, Text } from '../../atoms';

const meta: Meta<typeof List> = {
  title: 'MOLECULES/List',
  args: {}
};

export default meta;

const fakeProducts = Array.from({ length: 1000 }).map((_, index) => ({
  id: index.toString(),
  title: `Product ${index}`
}));

export const _List: ComponentStory<typeof List> = () => {
  return (
    <List
      data={fakeProducts}
      estimatedItemSize={100}
      numColumns={1}
      ItemComponent={({ item }) => {
        return (
          <Box>
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
          </Box>
        );
      }}
    />
  );
};
