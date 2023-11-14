import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../stack';
import { AccountDetailContainer } from './Container';
import { Icon } from '@app/components/Icon';
import { View } from 'react-native';

export type AccountDetailScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'AccountDetailScreen'
>;

export type UserDataType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  gender?: string;
};

export const AccountDetailScreen = () => {
  const navigation = useNavigation<AccountDetailScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="mr-2">
          <Icon
            iconName="edit-2"
            size="small"
            onPress={() => navigation.navigate('EditAccountDetailScreen')}
          />
        </View>
      )
    });
  }, [navigation]);

  return <AccountDetailContainer />;
};
