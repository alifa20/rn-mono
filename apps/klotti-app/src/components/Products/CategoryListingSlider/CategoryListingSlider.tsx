import { Icon } from '@klotti/ui';
import React from 'react';
import { ScrollView, Pressable, View, Text } from 'react-native';

type CategoryListingSliderProps = {
  header: string;
  categories: string[];
};

export const CategoryListingSlider = ({
  header,
  categories
}: CategoryListingSliderProps) => {
  return (
    <View>
      <View className='mx-5 flex-row  items-center justify-between'>
        <Text className='text-lg font-bold text-black'>{header}</Text>
        <Icon iconName='arrowright' iconType='antdesign' color='black' />
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className='mx-5 my-3 flex flex-row '>
          {categories.map(category => (
            <Pressable key={category} onPress={() => {}}>
              <View className='mr-4'>
                <View className='h-56 w-48 items-center justify-center rounded-2xl bg-gray-200'>
                  <Text className='font-bold text-white'>
                    {category.toUpperCase()}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
