import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { Toast } from './Toast';
import { Box, Button } from '../../atoms';
import { useToast } from './useToast';

const meta: Meta<typeof Toast> = {
  title: 'ORGANISM/Toast',
  args: {}
};

export default meta;

export const _Toast: ComponentStory<typeof Toast> = () => {
  const defaultToast = useToast();
  const iconToast = useToast();
  const dangerToast = useToast({
    type: 'error'
  });
  const infoToast = useToast({
    type: 'info'
  });

  return (
    <Box>
      <Button
        label='Show toast'
        onPress={() => {
          defaultToast.show({
            title: 'Title'
          });
        }}
      />

      <Button
        label='Show toast with icon'
        onPress={() => {
          iconToast.show({
            title: 'Title',
            icon: {
              iconName: 'check',
              iconType: 'feather'
            }
          });
        }}
      />

      <Button
        label='Show danger'
        onPress={() => {
          dangerToast.show({
            title: 'Title'
          });
        }}
      />

      <Button
        label='Show info'
        onPress={() => {
          infoToast.show({
            title: 'Title'
          });
        }}
      />
    </Box>
  );
};
