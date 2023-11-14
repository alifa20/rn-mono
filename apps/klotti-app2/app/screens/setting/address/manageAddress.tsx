import { View, Text, Pressable, SectionList } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AddressType } from '@app/__graphql__/generated';
import { SettingsStackParamList } from '../stack';
import { useUser } from '../profile/AccountDetail/hook/useUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { Loading } from '@app/components/Loading';
import { EmptyAddress } from './emptyAddress';

export type ManageAddressScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'ManageAddressRootScreen'
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

type Props = StackScreenProps<
  SettingsStackParamList,
  'ManageAddressRootScreen'
>;

export const ManageAddressRootScreen = (props: Props) => {
  const { navigation } = props;

  const navigateToManageAddressAddEditScreen = (addressId?: string) => {
    navigation.navigate('ManageAddressAddEditScreen', {
      addressId: addressId
    });
  };

  const { data, loading, error } = useUser();

  if (loading) {
    return <Loading fullScreen />;
  }
  if (error) {
    return <Text className="text-black">{error.message}</Text>;
  }

  const sectionData = _.chain(data?.user?.addresses)
    .groupBy('addressType')
    .map((value, key) => ({ title: key, data: value }))
    .value();
  const sortData = _.sortBy(sectionData, o =>
    o.title === AddressType.Primary ? 1 : 2
  );
  return (
    <View className="h-full">
      <SectionList
        sections={sortData}
        keyExtractor={item => item?.id || ''}
        ListFooterComponent={() => <View className="h-40" />}
        renderItem={({ item }) => (
          <View className="space-y-2 p-4">
            <Pressable
              onPress={() => {
                navigateToManageAddressAddEditScreen(item?.id);
              }}>
              <View className="rounded-md bg-gray-100">
                <View className="flex-row">
                  <Text className="my-3 ml-3 flex-1 font-medium text-black">
                    {item?.addressLine1}
                  </Text>
                  <Pressable className="m-3">
                    <MaterialIcons name="edit" size={20} />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ flex: 1 }}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<EmptyAddress />}
        renderSectionHeader={({ section }) => (
          <View className="justify-between">
            {sortData.indexOf(section) > 0 && (
              <View className="my-4 h-px w-full bg-[#F5F8FA]" />
            )}
            <Text className="pl-4 font-semibold text-black">
              {section.title}
            </Text>
          </View>
        )}
      />

      <View className="absolute bottom-0 mt-6 w-full flex-col justify-end p-4">
        <Pressable
          onPress={() => navigateToManageAddressAddEditScreen(undefined)}
          className="items-center rounded-md bg-gray-100">
          <Text className="my-4 text-base text-black">+ Add new address</Text>
        </Pressable>
        <View className="h-2" />
      </View>
    </View>
  );
};
