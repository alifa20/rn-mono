import { Button } from '@app/components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckoutStackParamList } from '../stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type PaymentMethodScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  'SelectCardScreen'
>;

export const SelectCardScreen = () => {
  const navigation = useNavigation<PaymentMethodScreenNavigationProp>();
  const [selectedItem, setSelect] = useState('');

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View className="space-y-2">
        <Pressable
          onPress={() => {
            setSelect(item);
          }}>
          <View className="rounded-md border border-gray-200">
            <View className="flex-row items-center px-3">
              <MaterialIcons
                name={
                  selectedItem === item
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={20}
              />
              <View className="ml-3">
                <FontAwesome size={20} name="cc-visa" />
              </View>
              <Text className="my-3 ml-3 flex-1 font-medium text-black">
                {item}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  const renderHeader = () => {
    return <Text className="py-4 font-bold">Saved Payment Method</Text>;
  };
  const renderFooter = () => {
    return (
      <View>
        <View className="my-4 h-px w-full bg-gray-200" />
        <Pressable
          onPress={() => {
            navigation.navigate('AddNewCardScreen');
          }}>
          <View className="rounded-md border border-gray-200">
            <View className="flex-row items-center px-3">
              <MaterialCommunityIcons
                size={30}
                name="credit-card-plus-outline"
              />
              <Text className="my-3 ml-3 flex-1 font-medium text-[#00AAFF]">
                Add New Card
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} />
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={['Ending with **99', 'Ending with **98']}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
      <View className="absolute bottom-0 left-0 w-full space-y-2 bg-white p-4">
        <Button
          type="primary"
          label="Save and Continue"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};
