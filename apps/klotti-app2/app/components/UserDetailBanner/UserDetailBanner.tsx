import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

type UserDetailBannerType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  onEditUser: () => void;
};

export const UserDetailBanner = ({
  firstName,
  lastName,
  emailAddress,
  onEditUser
}: UserDetailBannerType) => {
  return (
    <Pressable
      onPress={onEditUser}
      className={`mx-5 my-2 rounded-2xl ${'bg-gray-100'} active:bg-gray-200`}>
      <View className="mx-5 my-7 flex-1 flex-row items-center justify-between">
        <View>
          <Text className="text-md font-bold text-black">{`${firstName} ${lastName}`}</Text>
          <Text className="text-gray-400">{emailAddress}</Text>
        </View>
        <Pressable onPress={onEditUser}>
          <Feather name="edit-2" size={16} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};
