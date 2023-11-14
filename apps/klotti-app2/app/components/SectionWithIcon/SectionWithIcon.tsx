import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { OuterIconWrapper } from '../OuterIconWrapper';

type SectionWithIconType = {
  iconName: string;
  sectionName: string;
  onClick: () => void;
};
export const SectionWithIcon = ({
  iconName,
  sectionName,
  onClick
}: SectionWithIconType) => {
  return (
    <Pressable
      onPress={onClick}
      className="flex-1 flex-row content-center active:bg-gray-100">
      <OuterIconWrapper>
        <Feather
          name={iconName}
          color="black"
          size={20}
          style={{ textAlign: 'center' }}
        />
      </OuterIconWrapper>

      <View className="justify-center">
        <Text className="text-center text-black">{sectionName}</Text>
      </View>
    </Pressable>
  );
};
