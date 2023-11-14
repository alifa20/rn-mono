import {
  Box,
  Button,
  PasswordInput,
  Text,
  TextInput,
  useToast
} from '@klotti/ui';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/firebase/auth';

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z.string({
    required_error: 'Password is required'
  })
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const LoginScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const { push, back } = useRouter();
  const loginErrorToast = useToast({
    type: 'error'
  });
  const { control, register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    mode: 'all'
  });
  const { getState } = useNavigation();

  const handleSignInClick = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const state = getState();
      if (state.routes[1].name === 'register') back();
      back();
    } catch (e) {
      loginErrorToast.show({
        title: 'Incorrect password or username.',
        description: 'Please try again later.'
      });
    }

    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView>
      <Box
        marginTop={'2xl'}
        marginBottom={'xl'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text variant={'title1'}>KLOTTI</Text>
      </Box>

      <Box justifyContent={'center'} marginHorizontal={'xs'} gap='2xs'>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <TextInput
              label='Email address'
              placeholder='Enter email address'
              error={error?.message}
              onBlur={onBlur}
              onChangeText={v => onChange(v)}
              value={value}
            />
          )}
          {...register('email')}
        />

        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <PasswordInput
              label='Password'
              placeholder='Enter password'
              error={error?.message}
              onChangeText={v => onChange(v)}
              onBlur={onBlur}
              value={value}
            />
          )}
          {...register('password')}
        />

        <Button
          label='Forgot password?'
          onPress={() => push('/settings/forgot-password')}
          variants={'none'}
        />

        <Box marginTop={'m'}>
          <Button
            onPress={handleSubmit(async data => {
              await handleSignInClick({
                email: data.email,
                password: data.password
              });
            })}
            loading={loading}
            label='Login'
          />
        </Box>

        {/* {Platform.OS !== 'web' ? (
          <>
            <Text className='text-center text-gray-500'>Or Connect With</Text>
            <View className='m-4 flex-1 flex-row justify-evenly'>
              <Pressable
                onPress={async () => {
                  try {
                    await signInWithFacebook();
                  } catch (e: any) {
                    Alert.alert('Something went wrong', e.message);
                  }
                }}
                className='self-center rounded-lg border'>
                <View className='m-3'>
                  <Image source={FacebookIcon} className='h-6 w-6' />
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
                className='self-center rounded-lg border'>
                <View className='m-3'>
                  <Image source={GoogleIcon} className='h-6 w-6' />
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
                  className='self-center rounded-lg border'>
                  <View className='m-3'>
                    <Image source={AppleIcon} className='h-6 w-6' />
                  </View>
                </Pressable>
              ) : null}
            </View>
          </>
        ) : null} */}

        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Text>Don’t have an account? </Text>
          <Text variant={'label'} onPress={() => push('/settings/register')}>
            Register
          </Text>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
