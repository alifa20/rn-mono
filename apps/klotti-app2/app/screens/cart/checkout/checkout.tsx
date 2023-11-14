import { StackScreenProps } from '@react-navigation/stack';
import { useMemo } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { CheckoutStackParamList } from './stack';
import { Button } from '@app/components/buttons/Button';
import { useCartQuery, useCheckoutMutation } from '@app/__graphql__/generated';
import { IconButton } from '@app/components/buttons/IconButton';
import { Spacer } from '@app/components/Spacer';
import { useUserAddress } from '@app/screens/setting/address/hooks/useUserAddress';
import { paymentTypes } from './paymentMethod';

type CheckoutScreenNavigationProp = StackScreenProps<
  CheckoutStackParamList,
  'CheckoutScreen'
>;

export const CheckoutScreen = (props: CheckoutScreenNavigationProp) => {
  const { data } = useCartQuery();
  const { addresses } = useUserAddress();
  const [checkoutMutation, checkoutMutationStatus] = useCheckoutMutation();

  const selectedAddress = useMemo(
    () => addresses?.find(userAddress => userAddress?.preferred),
    [addresses]
  );

  const navigateToAddressScreen = () => {
    props.navigation.navigate('ChooseAddressScreen');
  };

  const navigateToPaymentMethodScreen = () => {
    props.navigation.navigate('PaymentMethodScreen');
  };

  return (
    <>
      <ScrollView>
        <View className="mx-4 mt-6 space-y-6">
          <View>
            <Text className="text-md font-bold">Delivery address</Text>
            <Spacer size="medium" />
            <View>
              <IconButton
                icon={{
                  name: 'edit-2'
                }}
                onPress={navigateToAddressScreen}
                label={selectedAddress?.addressLine1 || 'Not set yet...'}
              />
            </View>
          </View>

          {/* <View>
            <Text className="text-md font-bold">Delivery method</Text>
            <Spacer size="medium" />
            <View>
              <IconButton
                icon={{
                  name: 'chevron-right',
                  iconSize: 'small'
                }}
                onPress={navigateToAddressScreen}
                label={'One piece Free Delivery'}
              />
            </View>
          </View> */}

          <View>
            <Text className="text-md font-bold">Payment method</Text>
            <Spacer size="medium" />
            <View>
              <IconButton
                icon={{
                  name: 'chevron-right',
                  iconSize: 'small'
                }}
                onPress={navigateToPaymentMethodScreen}
                label={
                  (data?.user?.preferredPaymentType &&
                    paymentTypes[data?.user?.preferredPaymentType]) ||
                  'Select a payment method'
                }
              />
            </View>
          </View>

          <View className="space-y-4">
            <View className="my-6 space-y-4">
              <View className="w-full flex-row justify-between">
                <Text className="text-gray-500">Subtotal</Text>
                <Text className="text-gray-500">
                  ${data?.user?.cart?.subTotal.toFixed(2)}
                </Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className="text-gray-500">Shipping</Text>
                <Text className="text-gray-500">
                  {data?.user?.cart?.shippingFee === 0
                    ? 'Free shipping'
                    : data?.user?.cart?.shippingFee.toFixed(2)}
                </Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className="text-gray-500">Estimated Tax</Text>
                <Text className="text-gray-500">
                  ${data?.user?.cart?.taxAmount.toFixed(2)}
                </Text>
              </View>
            </View>

            <View className="w-full flex-row justify-between">
              <Text className="text-black">Total</Text>
              <Text className="text-black">
                ${data?.user?.cart?.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 w-full space-y-2 border-t border-gray-300 bg-white p-4">
        <Button
          type="primary"
          label="Place Order"
          loading={checkoutMutationStatus.loading}
          onPress={async () => {
            if (!selectedAddress || !data?.user?.preferredPaymentType) {
              Alert.alert('Please select a delivery address');
              return;
            }

            try {
              await checkoutMutation({
                variables: {
                  input: {
                    addressId: selectedAddress?.id,
                    paymentType: data?.user?.preferredPaymentType
                  }
                },
                refetchQueries: ['Cart']
              });
            } catch (e: any) {
              Alert.alert('Something went wrong, please try again');
              return;
            }

            props.navigation.replace('OrderSuccessScreen');
          }}
        />
        <Text className="text-center text-gray-500 ">
          By proceeding, I confirm I have read and agree to the
        </Text>
        <Text className="text-center text-gray-500 underline">
          Purchase & Return Policy.
        </Text>
      </View>
    </>
  );
};
