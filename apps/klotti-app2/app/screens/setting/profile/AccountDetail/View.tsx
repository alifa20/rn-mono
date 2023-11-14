import React from 'react';
import { format } from 'date-fns';
import { startCase } from 'lodash';
import { View, Text } from 'react-native';
import { Gender } from '@app/__graphql__/generated';
import { AccountInitialsDisplay } from '../EditAccountDetail/AccountInitialsDisplay';

export type AccountDetailViewType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date | null;
  gender?: Gender;
};

export const AccountDetailView = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  dateOfBirth
}: AccountDetailViewType) => {
  return (
    <View>
      <View className="mt-4 space-y-4">
        <AccountInitialsDisplay
          size="large"
          firstName={firstName}
          lastName={lastName}
        />
        <Text className="text-center text-lg">{`${firstName} ${lastName}`}</Text>
      </View>
      <View className="m-6 space-y-6">
        <View className="my-4 h-px w-full bg-[#F5F8FA]" />

        <View className="space-y-2">
          <Text className="text-[#6C7072]">Email</Text>
          <Text className="text-black">{email}</Text>
        </View>
        <View className="space-y-2">
          <Text className="text-[#6C7072]">Phone Number</Text>
          <Text className="text-black">{phoneNumber || '-'}</Text>
        </View>
        <View className="space-y-2">
          <Text className="text-[#6C7072]">Gender</Text>
          <Text className="text-black">{startCase(gender) || '-'}</Text>
        </View>
        <View className="space-y-2">
          <Text className="text-[#6C7072]">Date Of Birth</Text>
          <Text className="text-black">
            {dateOfBirth ? format(new Date(dateOfBirth), 'dd MMM, yyyy') : '-'}
          </Text>
        </View>
      </View>
    </View>
  );
};
