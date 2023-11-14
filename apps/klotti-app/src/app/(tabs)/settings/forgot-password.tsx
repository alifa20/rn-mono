import { Box, Button, Image, Text, TextInput, useToast } from '@klotti/ui';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForgotPasswordImage from '../../../../assets/images/forgot-password-icon.png';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/src/auth/useAuth';
import { useRouter } from 'expo-router';

const ForgotPasswordSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  })
});

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

export const ForgotPasswordScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const successToast = useToast({
    type: 'success'
  });
  const errorToast = useToast({
    type: 'error'
  });

  const { push } = useRouter();
  const { control, register, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'all'
  });

  const { forgotPassword } = useAuth();

  const handleForgotPasswordClick = async ({ email }: { email: string }) => {
    setLoading(true);
    try {
      await forgotPassword(email);
      successToast.show({
        title: 'Password reset email sent.',
        description: 'Please check your email.'
      });
    } catch (e) {
      errorToast.show({
        title: 'Error sending password reset email.',
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

      <Box alignItems={'center'}>
        <Image
          source={ForgotPasswordImage}
          height={250}
          aspectRatio={7 / 6}
          contentFit='contain'
          backgroundColor='transparent'
        />
      </Box>

      <Box
        marginTop={'m'}
        alignItems={'center'}
        gap={'2xs'}
        marginHorizontal={'xs'}>
        <Text variant={'title2'} textAlign={'center'}>
          Forgot Password
        </Text>
        <Text variant={'paragraph2'} color={'gray'} textAlign={'center'}>
          Enter your email address and we will send you instructions to reset
          password
        </Text>
      </Box>

      <Box
        justifyContent={'center'}
        gap='2xs'
        marginTop={'m'}
        marginHorizontal={'xs'}>
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

        <Box marginTop={'m'}>
          <Button
            onPress={handleSubmit(async data => {
              await handleForgotPasswordClick({
                email: data.email
              });
            })}
            loading={loading}
            label='Send Link'
          />
        </Box>

        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          marginBottom={'s'}>
          <Text>Oh, I remember my password. </Text>
          <Text variant={'label'} onPress={() => push('/settings/login')}>
            Back to Login
          </Text>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordScreen;
