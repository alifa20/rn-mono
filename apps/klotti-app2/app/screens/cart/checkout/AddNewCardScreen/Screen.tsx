import { Button } from '@app/components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import { CheckoutStackParamList } from '../stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNewCardFormSchema } from './form';
import { TextInput } from '@app/components/TextInput';

export type AddNewCardScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  'AddNewCardScreen'
>;

export const AddNewCardScreen = () => {
  const navigation = useNavigation<AddNewCardScreenNavigationProp>();
  const { control, formState, handleSubmit } = useForm({
    resolver: yupResolver(AddNewCardFormSchema),
    defaultValues: {
      cardNumber: '',
      cardHolderName: '',
      phoneNumber: ''
    },
    mode: 'all'
  });
  const { errors } = formState;

  return (
    <>
      <ScrollView>
        <View className="mx-4 space-y-4">
          <Text className="py-4 font-bold">Your Card Details</Text>

          <Controller
            name="cardNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First Name"
                iconType="feather"
                label="Card Number"
                error={errors.cardNumber?.message}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="cardHolderName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Card Holder Name"
                placeholder="Card Holder Name"
                error={errors.cardHolderName?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone Number"
                placeholder="Phone number"
                error={errors.phoneNumber?.message}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value || ''}
              />
            )}
          />
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 w-full space-y-2 bg-white p-4">
        <Button
          type="primary"
          label="Save and Continue"
          onPress={handleSubmit(() => {
            navigation.goBack();
          })}
        />
      </View>
    </>
  );
};
