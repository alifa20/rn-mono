import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckoutStackParamList } from './stack';
import { Loading } from '@app/components/Loading';
import { Button } from '@app/components/buttons/Button';
import { useEffect, useMemo, useState } from 'react';
import { useUserAddress } from '@app/screens/setting/address/hooks/useUserAddress';
import { useUpdateUserAddressMutation } from '@app/__graphql__/generated';
import { LoadingBlanket } from '@app/components/LoadingBlanket';
import { IconButton } from '@app/components/buttons/IconButton';

export type CheckoutScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  'ChooseAddressScreen'
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

type Props = StackScreenProps<CheckoutStackParamList, 'ChooseAddressScreen'>;

export const ChooseAddressScreen = (props: Props) => {
  const { navigation } = props;
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [updateUserAddressMutation, updateUserAddressMutationStatus] =
    useUpdateUserAddressMutation();

  const { addresses, error, loading } = useUserAddress();

  useEffect(() => {
    const address = addresses?.find(userAddress => userAddress?.preferred);
    setSelectedAddressId(address?.id);
  }, [addresses]);

  const selectedAddress = useMemo(
    () => addresses?.find(userAddress => userAddress?.id === selectedAddressId),
    [addresses, selectedAddressId]
  );

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <Text className="text-black">{error.message}</Text>;
  }

  return (
    <View>
      {updateUserAddressMutationStatus.loading && <LoadingBlanket />}
      <ScrollView className="h-full">
        <View className="m-5 gap-y-3">
          <Text className="text-md font-bold">Delivery address</Text>

          {addresses?.map(address => {
            const isSelected = address?.id === selectedAddressId;
            return (
              <Pressable
                key={address?.id}
                className="rounded-md border border-gray-200 active:bg-gray-200"
                onPress={() => {
                  setSelectedAddressId(address?.id);
                }}>
                <View className="m-3 flex-row items-center  justify-between">
                  <View className="flex-row items-center gap-x-2">
                    <MaterialIcons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={24}
                      color="black"
                    />

                    <View className="gap-1">
                      <Text
                        className={
                          isSelected ? 'font-semibold' : 'text-gray-500'
                        }>{`${address?.firstName} ${address?.lastName}`}</Text>
                      <Text
                        className="max-w-[90%] font-light text-gray-500"
                        numberOfLines={2}>
                        {address?.addressLine1}
                      </Text>
                    </View>
                  </View>

                  <Button
                    label="Edit"
                    type="outline"
                    onPress={() => {
                      navigation.navigate('ManageAddressAddEditScreen', {
                        addressId: address?.id
                      });
                    }}
                  />
                </View>
              </Pressable>
            );
          })}

          <View>
            <IconButton
              prefixIcon={{
                name: 'map-pin'
              }}
              icon={{
                name: 'chevron-right'
              }}
              type="outline"
              label="Add new address"
              onPress={() =>
                navigation.navigate('ManageAddressAddEditScreen', {
                  addressId: undefined
                })
              }
            />
          </View>
        </View>

        {/* <View className="absolute bottom-0 mt-6 w-full flex-col justify-end p-4">
        <Pressable
          onPress={() =>
            navigation.navigate('ManageAddressAddEditScreen', {
              addressId: undefined
            })
          }
          className="items-center rounded-md bg-gray-100">
          <Text className="my-4 text-base text-black">+ Add new address</Text>
        </Pressable>
        <View className="h-2" />
      </View> */}
      </ScrollView>
      <View className="absolute bottom-0 w-full p-4">
        <Button
          type="primary"
          label="Save and continue"
          onPress={async () => {
            if (!selectedAddressId || !selectedAddress) {
              return;
            }

            try {
              await updateUserAddressMutation({
                variables: {
                  addressId: selectedAddressId,
                  input: {
                    addressLine1: selectedAddress.addressLine1 || '',
                    addressLine2: selectedAddress.addressLine2 || '',
                    city: selectedAddress.city || '',
                    firstName: selectedAddress.firstName || '',
                    lastName: selectedAddress.lastName || '',
                    phoneNumber: selectedAddress.phoneNumber || '',
                    zipCode: selectedAddress.zipCode || '',
                    addressType: selectedAddress.addressType || 'OTHER',
                    preferred: true
                  }
                },
                refetchQueries: ['UserAddress', 'Cart']
              });
              navigation.goBack();
            } catch (e: any) {
              Alert.alert('Error', e.message);
            }
          }}
        />
      </View>
    </View>
  );
};
