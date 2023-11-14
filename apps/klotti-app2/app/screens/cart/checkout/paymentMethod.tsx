import { StackScreenProps } from '@react-navigation/stack';
import { CheckoutStackParamList } from './stack';
import { Alert, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  PaymentType,
  useCartQuery,
  useUpdateUserMutation
} from '@app/__graphql__/generated';
import { Button } from '@app/components/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@app/components/Icon';
import { useEffect, useState } from 'react';

type PaymentMethodScreenNavigationProps = StackScreenProps<
  CheckoutStackParamList,
  'PaymentMethodScreen'
>;

export type FilterScreenProps = {};

export const paymentTypes: Record<PaymentType, string> = {
  CASH_ON_DELIVERY: 'Cash on delivery',
  STRIPE: 'Card'
};

export const PaymentMethodScreen = (
  props: PaymentMethodScreenNavigationProps
) => {
  const { navigation } = props;
  const [
    updateUserPaymentPreference,
    updateUserPaymentPreferenceMutationStatus
  ] = useUpdateUserMutation();

  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>();

  const { data } = useCartQuery();

  const CARD_PAYMENT_UNAVAILABLE = true;

  useEffect(() => {
    if (!data?.user?.preferredPaymentType) {
      return;
    }

    setSelectedPaymentType(data?.user?.preferredPaymentType);
  }, [data?.user?.preferredPaymentType]);

  return (
    <View className="flex flex-1">
      <ScrollView>
        <View className="mx-5 mt-3">
          <View className="space-y-4">
            <Text className="font-semibold">Pay with</Text>

            <View className="space-y-4">
              <Pressable
                className={`rounded-md border ${
                  CARD_PAYMENT_UNAVAILABLE
                    ? 'border-blue-500'
                    : 'border-gray-200'
                } active:bg-gray-200`}
                disabled
                onPress={() => undefined}>
                <View className="m-3 flex-row items-center  justify-between">
                  <View className="flex-row items-center gap-x-2">
                    <MaterialIcons
                      name={'radio-button-off'}
                      size={24}
                      color="black"
                    />
                    <Text
                      className={
                        CARD_PAYMENT_UNAVAILABLE
                          ? 'text-blue-500'
                          : 'text-gray-500'
                      }>
                      Card
                    </Text>
                  </View>
                  {/* TODO: Coming soon */}
                  <View className="flex-row items-center">
                    <Text
                      className={
                        CARD_PAYMENT_UNAVAILABLE ? 'text-blue-600' : ''
                      }>
                      Coming soon
                    </Text>
                    <Icon
                      iconName="chevron-right"
                      color={CARD_PAYMENT_UNAVAILABLE ? 'blue' : ''}
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                className="rounded-md border border-gray-200 active:bg-gray-200"
                onPress={() => {
                  setSelectedPaymentType(PaymentType.CashOnDelivery);
                }}>
                <View className="m-3 flex-row items-center  justify-between">
                  <View className="flex-row items-center gap-x-2">
                    <MaterialIcons
                      name={
                        selectedPaymentType === PaymentType.CashOnDelivery
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={24}
                      color="black"
                    />
                    <Text className="text-gray-500">
                      {paymentTypes.CASH_ON_DELIVERY}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="m-3">
        <Button
          type="primary"
          label="Save and continue"
          loading={updateUserPaymentPreferenceMutationStatus.loading}
          onPress={async () => {
            try {
              await updateUserPaymentPreference({
                variables: {
                  input: {
                    preferredPaymentType: PaymentType.CashOnDelivery
                  }
                },
                refetchQueries: ['Cart']
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
