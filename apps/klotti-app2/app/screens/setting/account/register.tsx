import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParamList } from '../stack';
import { showAlert } from '@app/utils/alertUtil';
import { useAuthentication } from '@app/auth';
import { useRef, useState } from 'react';
import { Gender } from '@app/__graphql__/generated';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { View, Pressable, Text } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager
} from 'react-native-actions-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '@app/components/TextInput';
import { Button } from '@app/components/buttons/Button';
import * as Yup from 'yup';

type RegisterScreenNavigationProp = StackScreenProps<
  SettingsStackParamList,
  'RegisterScreen'
>;

const genders = [
  { value: Gender.Male, label: Gender.Male },
  { value: Gender.Female, label: Gender.Female }
];

export const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required')
});

export const RegisterScreen = (props: RegisterScreenNavigationProp) => {
  const { navigation } = props;
  const { register } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const navigateToLoginScreen = async () => {
    navigation.replace('LoginScreen');
  };

  const submit = async ({
    email,
    password,
    firstName,
    lastName,
    gender
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
  }) => {
    setLoading(true);

    try {
      await register({
        email,
        password,
        firstName,
        lastName,
        gender: gender as Gender
      });
    } catch (e) {
      showAlert('Error', `${e}`);
    }
    setLoading(false);
  };
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      gender: 'MALE'
    },
    mode: 'all'
  });
  const { errors } = formState;
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const onSelectGender = (g: string) => {
    setValue('gender', g as Gender);
    SheetManager.hide('Gender');
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        {/* <Image
          source={AppLogoDark}
          className="h-24 w-24 self-center"
          resizeMode="contain"
        /> */}
        <View>
          <Text className="text-center text-3xl font-bold text-black">
            Register
          </Text>
          <Text className="p-10 text-center text-gray-500">
            Follow the step for create account
          </Text>
        </View>

        <View className="space-y-2 p-6">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email Address"
                placeholder="Email address"
                error={errors.email?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

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
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                secureTextEntry={true}
                placeholder="Password"
                error={errors.password?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <Pressable onPress={() => SheetManager.show('Gender')}>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Gender"
                  error={errors.gender?.message?.toString()}
                  onChangeText={v => onChange(v)}
                  onBlur={onBlur}
                  value={value}
                  isReadOnly
                  onPressIn={() => SheetManager.show('Gender')}
                />
              )}
            />
          </Pressable>

          <View className="my-6">
            <Button
              onPress={handleSubmit(submit)}
              loading={loading}
              label="Register"
            />
          </View>

          <View className="flex-1 flex-row self-center">
            <Text className="text-[#6C7072]">Already have an account? </Text>
            <Text
              className="font-bold text-black"
              onPress={navigateToLoginScreen}>
              Login
            </Text>
          </View>
        </View>
        <ActionSheet
          id="Gender"
          ref={actionSheetRef}
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}>
          <View className="px-4 pb-8">
            <View className="h-14 w-full justify-center px-4">
              <Text className="text-center text-base text-black">Gender</Text>
            </View>
            <View>
              {genders.map(g => (
                <Pressable
                  onPress={() => onSelectGender(g.value)}
                  className="h-12 w-full">
                  <Text className="text-black">{g.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ActionSheet>
      </View>
    </KeyboardAwareScrollView>
  );
};
