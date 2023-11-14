import { useState } from 'react';
import { Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Image, View, Pressable, Platform } from 'react-native';
import { Button } from '@app/components/buttons/Button';
import FacebookIcon from '../../../../assets/icons/facebook-icon.png';
import GoogleIcon from '../../../../assets/icons/google-icon.png';
import AppleIcon from '../../../../assets/icons/apple-icon.png';
import { TextInput } from '../../../components/TextInput';
import { useAuthentication } from '@app/auth';
import * as Yup from 'yup';
import { AccountStackParamList } from './stack';
import auth from '@react-native-firebase/auth';

type LoginScreenNavigationProp = StackScreenProps<
  AccountStackParamList,
  'LoginScreen'
>;

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

export const LoginScreen = (props: LoginScreenNavigationProp) => {
  const { navigate } = props.navigation;
  const [loading, setLoading] = useState(false);
  const { signInWithFacebook, signInWithGoogle } = useAuthentication();

  const { control, formState, handleSubmit } = useForm({
    resolver: yupResolver(LoginFormSchema),
    mode: 'all'
  });

  const { errors } = formState;

  const handleNavigateSignup = async () => {
    navigate('RegisterScreen');
  };

  const handleNavigateForgotPassword = () => navigate('ForgotPasswordScreen');

  const handleSignInClick = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
      Alert.alert('Incorrect password or username.', 'Please try again later.');
    }

    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text className="mb-8 mt-20 text-center text-4xl font-bold text-black">
          KLOTTI
        </Text>

        <View className="m-6 space-y-3">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email address"
                placeholder="Email address"
                error={errors.email?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                placeholder="Password"
                secureTextEntry={true}
                error={errors.password?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Button
            label="Forgot password?"
            onPress={handleNavigateForgotPassword}
            type={'none'}
          />

          <View className="my-6">
            <Button
              onPress={handleSubmit(data =>
                handleSignInClick({
                  email: data.email,
                  password: data.password
                })
              )}
              loading={loading}
              label="Login"
            />
          </View>

          {Platform.OS !== 'web' ? (
            <>
              <Text className="text-center text-gray-500">Or Connect With</Text>
              <View className="m-4 flex-1 flex-row justify-evenly">
                <Pressable
                  onPress={async () => {
                    try {
                      await signInWithFacebook();
                    } catch (e: any) {
                      Alert.alert('Something went wrong', e.message);
                    }
                  }}
                  className="self-center rounded-lg border">
                  <View className="m-3">
                    <Image source={FacebookIcon} className="h-6 w-6" />
                  </View>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    try {
                      await signInWithGoogle();
                    } catch (e: any) {
                      Alert.alert('Something went wrong', e.message);
                    }
                  }}
                  className="self-center rounded-lg border">
                  <View className="m-3">
                    <Image source={GoogleIcon} className="h-6 w-6" />
                  </View>
                </Pressable>
                {Platform.OS === 'ios' ? (
                  <Pressable
                    onPress={async () => {
                      try {
                        return Alert.alert('Service unavailable');

                        // await signInWithApple();
                      } catch (e: any) {
                        Alert.alert('Something went wrong', e.message);
                      }
                    }}
                    className="self-center rounded-lg border">
                    <View className="m-3">
                      <Image source={AppleIcon} className="h-6 w-6" />
                    </View>
                  </Pressable>
                ) : null}
              </View>
            </>
          ) : null}

          <View className="flex-1 flex-row self-center">
            <Text className="text-gray-500">Don’t have an account? </Text>
            <Text
              className="font-bold text-black"
              onPress={handleNavigateSignup}>
              Register
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
