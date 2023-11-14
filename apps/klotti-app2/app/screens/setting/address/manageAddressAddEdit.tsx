import {
  AddressType,
  useAddUserAddressMutation,
  useDeleteUserAddressMutation,
  useUpdateUserAddressMutation
} from '@app/__graphql__/generated';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import { SettingsStackParamList } from '../stack';
import { useUserAddress } from './hooks/useUserAddress';
import { TextInput } from '@app/components/TextInput';
import { Alert, Switch, View } from 'react-native';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@app/components/buttons/Button';
import { Stack } from '@app/components/Stack';
import { SelectOption } from '@app/components/SelectOption';
import { cambodiaCities } from './types/cities';
import { useLayoutEffect } from 'react';
import * as Yup from 'yup';

import { LoadingBlanket } from '@app/components/LoadingBlanket';
import { CheckoutStackParamList } from '@app/screens/cart/checkout/stack';

type Props = StackScreenProps<
  SettingsStackParamList | CheckoutStackParamList,
  'ManageAddressAddEditScreen'
>;

export type ManageAddressAddEditScreenProps = {
  addressId?: string;
};

export const AddressFormSchema = Yup.object().shape({
  addressLine1: Yup.string().required('Required'),
  addressLine2: Yup.string().notRequired().nullable(),
  city: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  addressType: Yup.string().notRequired(),
  zipCode: Yup.string().required('Required')
});

export const ManageAddressAddEditScreen = (props: Props) => {
  const { route, navigation } = props;
  const { addressId } = route.params;

  const { address } = useUserAddress(addressId);
  const isEdit = !!addressId;

  const [addUserAddressMutation, addUserAddressMutationStatus] =
    useAddUserAddressMutation();
  const [updateUserAddressMutation, updateUserAddressMutationStatus] =
    useUpdateUserAddressMutation();
  const [deleteUserAddressMutation, deleteUserAddressMutationStatus] =
    useDeleteUserAddressMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit ? 'Edit Address' : 'Add Address'
    });
  }, [addressId, address, navigation, isEdit]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(AddressFormSchema),
    defaultValues: {
      ...address
    }
  });

  const loadingMutation =
    addUserAddressMutationStatus.loading ||
    updateUserAddressMutationStatus.loading;
  return (
    <View className="mx-5">
      {deleteUserAddressMutationStatus.loading && <LoadingBlanket />}

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Stack>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="First Name"
                placeholder="First Name"
                iconType="feather"
                error={errors.firstName?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                iconType="feather"
                error={errors.lastName?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="addressLine1"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Address line 1"
                placeholder="Address Line 1"
                error={errors.addressLine1?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="addressLine2"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Address Line 2"
                placeholder="Address Line 2"
                error={errors.addressLine2?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value || undefined}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectOption
                innerTitle="City or Province"
                options={cambodiaCities}
                onValueChange={onChange}
                // @ts-ignore
                selectedValue={value || undefined}
                renderCustomButton={
                  <TextInput
                    label="City or Province"
                    placeholder="City or Province"
                    value={value || undefined}
                    iconNameSuffix="keyboard-arrow-down"
                    error={errors.city?.message?.toString()}
                    isReadOnly
                  />
                }
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone"
                placeholder="Phone"
                error={errors.phoneNumber?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="zipCode"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Zip Code"
                placeholder="Zip Code"
                error={errors.zipCode?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <View className="flex-row items-center justify-between">
            <Text className="my-4 text-sm text-gray-400">
              Set as primary address
            </Text>
            <Controller
              name="addressType"
              control={control}
              render={({ field: { value } }) => (
                <Switch
                  value={value === AddressType.Primary}
                  onValueChange={v =>
                    setValue(
                      'addressType',
                      v ? AddressType.Primary : AddressType.Other
                    )
                  }
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              )}
            />
          </View>

          {isEdit ? (
            <Button
              label="Delete Address"
              type="critical"
              onPress={async () => {
                Alert.alert(
                  'Delete Addresss',
                  'Are you sure you want to delete this address?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          await deleteUserAddressMutation({
                            variables: { addressId },
                            refetchQueries: ['UserAddress']
                          });
                          navigation.goBack();
                        } catch (e: any) {
                          Alert.alert(e.message);
                        }
                      }
                    }
                  ]
                );
              }}
            />
          ) : null}

          <Button
            onPress={handleSubmit(async value => {
              const input = {
                addressLine1: value.addressLine1 || '',
                addressLine2: value.addressLine2 || '',
                city: value.city || '',
                firstName: value.firstName || '',
                lastName: value.lastName || '',
                phoneNumber: value.phoneNumber || '',
                zipCode: value.zipCode || '',
                addressType: value.addressType || 'OTHER'
              };

              try {
                if (isEdit) {
                  await updateUserAddressMutation({
                    variables: {
                      addressId: addressId,
                      input: input
                    },
                    refetchQueries: ['UserAddress']
                  });
                } else {
                  await addUserAddressMutation({
                    variables: {
                      input: input
                    },
                    refetchQueries: ['UserAddress']
                  });
                }

                navigation.goBack();
              } catch (e: any) {
                console.log('e', e.message);

                Alert.alert(e.message);
              }
            })}
            loading={loadingMutation}
            label={isEdit ? 'Update' : 'Save'}
          />
        </Stack>
      </KeyboardAwareScrollView>
    </View>
  );
};
