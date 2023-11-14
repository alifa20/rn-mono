import React, { forwardRef } from 'react';
import { BottomSheet } from '..';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';

import {
  Box,
  IconButton,
  CheckItem,
  Text,
  OptionType as BaseOptionType
} from '../../atoms';

export type SelectOptionProps<Option extends BaseOptionType> = {
  options: Option[];
  title: string;
  selectedValue?: Option['value'];
  onValueChange: (value: Option['value']) => void;
  showActionSheet?: boolean;
  hideSheet: () => void;
};

export const SelectOptionSheet = forwardRef<
  BottomSheetModal,
  SelectOptionProps<BaseOptionType>
>(({ title, options, selectedValue, onValueChange, hideSheet }, ref) => {
  return (
    <BottomSheet ref={ref} snapPoints={['40%', '60%']}>
      <Box
        paddingHorizontal={'s'}
        paddingBottom={'xs'}
        width={'100%'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <Box width={32} />
        <Box justifyContent={'center'} alignItems={'center'}>
          <Text textAlign={'center'} variant={'title2'}>
            {title}
          </Text>
        </Box>
        <IconButton
          icon={{
            iconName: 'close',
            iconType: 'antdesign'
          }}
          onPress={hideSheet}
        />
      </Box>

      <BottomSheetFlatList
        data={options}
        keyExtractor={item => item.value}
        style={{
          marginBottom: 16
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CheckItem
            label={item.label}
            checked={item.value === selectedValue}
            onValueChange={() => {
              onValueChange(item.value);
              hideSheet();
            }}
            marginHorizontal={'s'}
          />
        )}
      />
    </BottomSheet>
  );
});
