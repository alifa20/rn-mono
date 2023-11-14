import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';
import { TextInput } from './TextInput';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof TextInput> = {
  title: 'ATOMS/TextInput',
  args: {}
};

export default meta;

export const _TextInput: ComponentStory<typeof TextInput> = props => {
  return (
    <Box gap='s'>
      <Box>
        <Text>Textinput</Text>
        <TextInput
          {...props}
          iconSuffix={{
            icon: {
              iconName: 'search',
              iconType: 'materialicons'
            },
            disabled: true
          }}
          onChangeText={() => null}
        />
      </Box>
      <Box>
        <Text>Textinput Prefix</Text>
        <TextInput
          {...props}
          iconPrefix={{
            icon: {
              iconName: 'search',
              iconType: 'materialicons'
            },
            disabled: true
          }}
          onChangeText={() => null}
        />
      </Box>
      <Box>
        <Text>Textinput Suffix</Text>
        <TextInput
          {...props}
          iconSuffix={{
            icon: {
              iconName: 'search',
              iconType: 'materialicons'
            },
            disabled: true
          }}
          onChangeText={() => null}
        />
      </Box>

      <Box>
        <Text>Textinput with error</Text>
        <TextInput
          {...props}
          iconSuffix={{
            icon: {
              iconName: 'search',
              iconType: 'materialicons'
            },
            disabled: true
          }}
          onChangeText={() => null}
          error='Error'
        />
      </Box>
    </Box>
  );
};
