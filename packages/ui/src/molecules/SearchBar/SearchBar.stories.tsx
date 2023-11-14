import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Box, Text } from '../../atoms';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'MOLECULES/SearchBar',
  args: {}
};

export default meta;

export const _SearchBar: ComponentStory<typeof SearchBar> = () => {
  const ref = React.useRef(null);
  const [text, setText] = React.useState('');
  return (
    <Box gap='s'>
      <Text>SearchBar</Text>
      <SearchBar
        ref={ref}
        placeholder='Searching'
        value={text}
        onChangeText={value => setText(value)}
      />

      <Text>Searching Searchbar</Text>
      <SearchBar
        ref={ref}
        placeholder='Searching'
        value={text}
        onChangeText={value => setText(value)}
        isSearching={true}
      />
    </Box>
  );
};
