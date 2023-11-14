import React, { useEffect, useRef, useState } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Pressable, View, Text, Platform } from 'react-native';
import { Button } from '../buttons/Button';

type BaseOption = { readonly label: string; readonly value: string };

type SelectOptionProps<Option extends BaseOption> = {
  options: Option[];
  title: string;
  innerTitle: string;
  selectedValue: Option['value'];
  onValueChange: (value: Option['value']) => void;
  renderCustomButton?: React.ReactElement;
  showActionSheet?: boolean;
};

export const SelectOption = <Option extends BaseOption>({
  title,
  innerTitle,
  onValueChange,
  selectedValue,
  options,
  showActionSheet,
  renderCustomButton
}: SelectOptionProps<Option>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const pickerRef = useRef<Picker<any>>(null);

  const [selectedOption, setSelectedOption] =
    useState<Option['value']>(selectedValue);

  const label = options.find(option => option.value === selectedValue)?.label;

  useEffect(() => {
    showActionSheet
      ? actionSheetRef?.current?.show()
      : actionSheetRef?.current?.hide();
  }, [showActionSheet]);

  const handlePress = () => {
    setSelectedOption(selectedValue);
    if (Platform.OS === 'ios') {
      actionSheetRef?.current?.show();
    }

    if (Platform.OS === 'android') {
      pickerRef.current?.focus();
    }
  };

  return (
    <>
      {renderCustomButton ? (
        React.cloneElement(renderCustomButton, {
          onPress: handlePress,
          onPressIn: handlePress
        })
      ) : (
        <Pressable
          className="rounded-lg border border-gray-300 active:bg-gray-200"
          onPress={handlePress}>
          <View className="flex-row items-center justify-center px-2">
            {label && label?.length > 4 ? (
              <Text className="p-2 text-[#6C7072]" numberOfLines={1}>
                {label}
              </Text>
            ) : (
              <>
                <Text className="font-bold">{title}</Text>
                <Text className="p-2 text-[#6C7072]" numberOfLines={1}>
                  {label}
                </Text>
              </>
            )}

            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#6C7072"
            />

            {Platform.OS === 'android' && (
              <Picker
                ref={pickerRef}
                selectedValue={selectedOption}
                // This is really weird but it works
                style={{
                  position: 'absolute',
                  top: -1000,
                  left: -1000,
                  width: 0,
                  height: 0
                }}
                onValueChange={value => onValueChange(value)}>
                {options.map(option => (
                  <Picker.Item
                    key={option.value}
                    color="black"
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            )}
          </View>
        </Pressable>
      )}

      {Platform.OS === 'ios' && (
        <>
          <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={false}
            defaultOverlayOpacity={0.3}>
            <View className="px-4 pb-8">
              <View className="h-14 w-full justify-center">
                <Text className="text-center text-base text-black">
                  {innerTitle}
                </Text>
              </View>
              <View className="w-full">
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={value => {
                    setSelectedOption(value);
                  }}>
                  {options.map(option => (
                    <Picker.Item
                      key={option.value}
                      color="black"
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
              <Button
                label="Done"
                onPress={() => {
                  onValueChange(selectedOption || options[0].value);
                  actionSheetRef?.current?.hide();
                }}
              />
            </View>
          </ActionSheet>
        </>
      )}
    </>
  );
};
