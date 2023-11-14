import { useAuth } from '@/src/auth/useAuth';
import { showAlert } from '@/src/utils/alertUtil';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Text, TextInput } from '@klotti/ui';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

const RegisterSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .nonempty({ message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .nonempty({ message: 'Password is required' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirm password is required' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type RegisterForm = z.infer<typeof RegisterSchema>;

export const RegisterScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const { getState } = useNavigation();
  const { push, back } = useRouter();
  const { register: registerAccount } = useAuth();
  const { control, register, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    mode: 'all'
  });

  const handleSubmitForm = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await registerAccount(data);
      const state = getState();
      if (state.routes[1].name === 'login') back();
      back();
    } catch (e) {
      showAlert('Error', `${e}`);
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

        <Box marginTop={'m'} gap='2xs'>
          <Text variant={'title2'} textAlign={'center'}>
            Register
          </Text>
          <Text variant={'placeholder'} color={'gray'}>
            Follow the step for create account
          </Text>
        </Box>
      </Box>

      <Box justifyContent={'center'} marginHorizontal={'xs'} gap='2xs'>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <TextInput
              label='First name'
              placeholder='Enter first name'
              error={error?.message}
              onBlur={onBlur}
              onChangeText={v => onChange(v)}
              value={value}
            />
          )}
          {...register('firstName')}
        />

        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <TextInput
              label='Last name'
              placeholder='Enter last name'
              error={error?.message}
              onBlur={onBlur}
              onChangeText={v => onChange(v)}
              value={value}
            />
          )}
          {...register('lastName')}
        />

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
            <TextInput
              label='Password'
              placeholder='Enter password'
              error={error?.message}
              onChangeText={v => onChange(v)}
              onBlur={onBlur}
              secureTextEntry={true}
              value={value}
            />
          )}
          {...register('password')}
        />

        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <TextInput
              label='Confirm password'
              placeholder='Enter confirm password'
              error={error?.message}
              onChangeText={v => onChange(v)}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
            />
          )}
          {...register('confirmPassword')}
        />

        <Box marginTop={'m'}>
          <Button
            label={'Register'}
            onPress={handleSubmit(handleSubmitForm)}
            loading={loading}
          />
        </Box>

        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          marginBottom={'2xl'}>
          <Text>Already have an account? </Text>
          <Text variant={'label'} onPress={() => push('/settings/login')}>
            Back to login
          </Text>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
