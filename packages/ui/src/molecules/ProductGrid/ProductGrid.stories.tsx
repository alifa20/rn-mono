import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { ProductGrid } from './ProductGrid';
import { Box, Text } from '../../atoms';
import { ScrollView } from 'react-native';

const meta: Meta<typeof ProductGrid> = {
  title: 'MOLECULES/ProductGrid',
  args: {}
};

export default meta;

export const _ProductGrid: ComponentStory<typeof ProductGrid> = () => {
  return (
    <ScrollView>
      <Box
        gap={'xs'}
        flex={1}
        alignItems={'center'}
        backgroundColor={'background'}>
        <Text variant={'title1'}>Product Grid</Text>
        <ProductGrid
          image={{
            source: 'https://picsum.photos/seed/696/3000/2000'
          }}
          title='Crew Neck'
          brandName='A-Cold-Wall'
          onPress={() => {}}
          price={100}
        />

        <Text variant={'title1'}>Product Grid with discount</Text>
        <ProductGrid
          image={{
            source: 'https://picsum.photos/seed/696/3000/2000'
          }}
          title='Crew Neck'
          brandName='A-Cold-Wall'
          onPress={() => {}}
          price={100}
          discountedPrice={20}
        />

        <Text variant={'title1'}>Product Grid with tag</Text>
        <ProductGrid
          image={{
            source: 'https://picsum.photos/seed/696/3000/2000'
          }}
          title='Crew Neck'
          brandName='A-Cold-Wall'
          onPress={() => {}}
          price={100}
          tag={{
            amount: 10
          }}
        />
      </Box>
    </ScrollView>
  );
};
