import React, { useState } from 'react';
import type { ComponentStory, Meta } from '@storybook/react-native';

import { SelectOption } from './SelectOption';
import { OptionType } from '../../atoms';

const meta: Meta<typeof SelectOption> = {
  title: 'ORGANISM/SelectOption',
  args: {}
};

export default meta;

const options = Array.from({ length: 10 }, (_, index) => ({
  label: `Option ${index}`,
  value: `option-${index}`
}));

export const _SelectOption: ComponentStory<typeof SelectOption> = () => {
  const [option, setOption] = useState<OptionType['value'] | undefined>();

  return (
    <SelectOption
      showActionSheet={true}
      placeholder='Select Option'
      title='Size'
      options={options}
      onValueChange={setOption}
      selectedValue={option}
    />
  );
};
