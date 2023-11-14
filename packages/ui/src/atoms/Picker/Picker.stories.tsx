import React, { useRef, useState } from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { OptionType, Picker } from './Picker';
import { Box } from '../Box';
import { Button } from '../buttons';
import { Picker as RNPicker } from '@react-native-picker/picker';

const meta: Meta<typeof Picker> = {
  title: 'ATOMS/Picker',
  args: {}
};

export default meta;

const options = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  }
];

export const _Picker: ComponentStory<typeof Picker> = () => {
  const pickerRef = useRef<RNPicker<any>>(null);
  const [option, setOption] = useState<OptionType['value'] | undefined>();
  const [show, setShow] = useState<Boolean>();

  return (
    <Box>
      <Button
        label='Show picker'
        onPress={() => {
          setShow(true);
          pickerRef.current?.focus();
        }}
      />
      {show && (
        <Picker
          ref={pickerRef}
          options={options}
          onValueChange={setOption}
          selectedValue={option}
        />
      )}
    </Box>
  );
};
