import React, { useEffect, useMemo } from 'react';

import { Box, OptionType as BaseOptionType } from '../../atoms';

import { useBottomSheet } from '../../molecules/BottomSheet';
import { OptionButton } from '../../atoms';
import { SelectOptionSheet } from '../../molecules';

type SelectOptionProps<Option extends BaseOptionType> = {
  options: Option[];
  title: string;
  placeholder: string;
  selectedValue?: Option['value'];
  onValueChange: (value: Option['value']) => void;
  showActionSheet?: boolean;
};

export const SelectOption = <Option extends BaseOptionType>({
  title,
  placeholder,
  onValueChange,
  selectedValue,
  options,
  showActionSheet
}: SelectOptionProps<Option>) => {
  const selectOptionSheet = useBottomSheet();

  const selectedOption = useMemo(
    () => options.find(option => option.value === selectedValue),
    [selectedValue, options]
  );

  useEffect(() => {
    showActionSheet && selectOptionSheet.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showActionSheet]);

  const handlePress = () => {
    selectOptionSheet.show();
  };

  return (
    <Box flex={1}>
      <OptionButton
        onPress={handlePress}
        placeholder={placeholder}
        option={selectedOption}
      />

      <SelectOptionSheet
        ref={selectOptionSheet.ref}
        hideSheet={selectOptionSheet.hide}
        options={options}
        onValueChange={onValueChange}
        title={title}
        selectedValue={selectedValue}
        showActionSheet={showActionSheet}
      />
    </Box>
  );
};
