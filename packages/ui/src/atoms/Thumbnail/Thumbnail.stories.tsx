import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { Thumbnail } from './Thumbnail';
import { Box, Text } from '../../atoms';
import { ScrollView } from 'react-native';

const meta: Meta<typeof Thumbnail> = {
  title: 'ATOMS/Thumbnail',
  args: {}
};

export default meta;

export const _Thumbnail: ComponentStory<typeof Thumbnail> = () => {
  return (
    <ScrollView>
      <Text>Square with tag</Text>
      <Box flexDirection={'row'} gap={'s'} my='m' flexWrap={'wrap'}>
        <Box width={150}>
          <Thumbnail
            image={{
              source: 'https://picsum.photos/seed/696/3000/2000'
            }}
          />
        </Box>

        <Box width={150}>
          <Thumbnail
            image={{
              source: 'https://picsum.photos/seed/696/3000/2000'
            }}
            tag={{
              amount: 20
            }}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};
