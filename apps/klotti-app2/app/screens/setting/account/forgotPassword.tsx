import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from '../../../auth';
import { AppColor } from '@app/utils/color';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from '@app/components/Image';
import { Button } from '@app/components/buttons/Button';
import * as Yup from 'yup';
import ForgotPasswordIcon from '@assets/icons/forgot-password-icon.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '@app/components/TextInput';
import { AccountStackParamList } from './stack';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AccountStackParamList,
  'ForgotPasswordScreen'
>;

export const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
});

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const { control, formState, handleSubmit } = useForm({
    resolver: yupResolver(ForgotPasswordFormSchema),
    defaultValues: { email: '', password: '' },
    mode: 'all'
  });
  const { errors } = formState;

  const { forgotPassword } = useAuthentication();

  const navigateToLoginScreen = async () => {
    navigation.replace('LoginScreen');
  };

  const submit = async ({ email }: { email: string }) => {
    setLoading(true);
    try {
      await forgotPassword({
        email
      });
      Alert.alert('Success', 'Your password has been reset.');
    } catch (e) {
      Alert.alert(
        'Something went wrong.',
        'Unable to reset your password. Please try again later.'
      );
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View>
          <Image
            className="h-60 w-full"
            source={ForgotPasswordIcon}
            resizeMode="center"
          />
        </View>

        <View className="mx-16 mt-4 space-y-4">
          <Text className="text-center text-2xl font-bold">
            Forgot Password
          </Text>
          <Text className="text-center text-[#6C7072]">
            Enter your email address and we will send you instructions to reset
            password
          </Text>
        </View>

        <View className="m-6 space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Email address"
                  placeholder="Email address"
                  error={errors.email?.message}
                  onChangeText={v => onChange(v)}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
          />

          <View className="my-6 w-full self-center">
            <Button
              label="Send Code"
              onPress={handleSubmit(submit)}
              loading={loading}
            />
          </View>

          <View className="flex-1 flex-row self-center">
            <Text className="text-[#6C7072]">Oh, I remember my password. </Text>
            <Text
              className="font-bold text-black"
              onPress={navigateToLoginScreen}>
              Back to Login
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
