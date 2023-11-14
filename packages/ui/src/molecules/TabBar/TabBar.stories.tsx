import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { Box, Text } from '../../atoms';
import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'MOLECULES/TabBar',
  args: {}
};

export default meta;

export const _TabBar: ComponentStory<typeof TabBar> = props => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 1'];
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Box gap='s'>
      <Text>TabBar</Text>
      <TabBar
        {...props}
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Box>
  );
};
