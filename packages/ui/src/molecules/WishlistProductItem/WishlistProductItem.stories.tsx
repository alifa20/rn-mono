import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { WishlistProductItem } from './WishlistProductItem';
import { Box } from '../../atoms';

const meta: Meta<typeof WishlistProductItem> = {
  title: 'MOLECULES/WishlistProductItem',
  args: {}
};

export default meta;

export const _WishlistProductItem: ComponentStory<
  typeof WishlistProductItem
> = () => {
  return (
    <Box marginHorizontal={'s'}>
      <WishlistProductItem
        description='Denim Pink Jacket'
        title='Nike Sport'
        onAddToBag={() => null}
        onRemove={() => null}
        price={100}
        onItemPress={() => null}
      />
    </Box>
  );
};
