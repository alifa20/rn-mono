import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from '@app/components/TextInput';
import ActionSheet, {
  ActionSheetRef,
  SheetManager
} from 'react-native-actions-sheet';
import { Gender } from '@app/__graphql__/generated';
import { AccountDetailViewType } from '../AccountDetail';
import { EditAccountDetailFormSchema } from './form';
import { AccountInitialsDisplay } from './AccountInitialsDisplay';
import { DatePicker } from '../../../../components/DatePicker';
import { Button } from '@app/components/buttons/Button';

const genders = [
  { value: Gender.Male, label: Gender.Male },
  { value: Gender.Female, label: Gender.Female }
];

type EditAccountDetailViewProps = {
  saveChanges: (payload: AccountDetailViewType) => void;
  loading: boolean;
} & AccountDetailViewType;

export const EditAccountDetailView = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
  phoneNumber,
  gender,
  loading,
  saveChanges
}: EditAccountDetailViewProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(EditAccountDetailFormSchema),
    defaultValues: {
      email,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth || undefined,
      phoneNumber: phoneNumber || '',
      gender
    },
    mode: 'all'
  });
  const { errors } = formState;

  const onSubmit = (data: AccountDetailViewType) => {
    saveChanges(data);
  };

  const onClose = () => {
    SheetManager.hide('Gender');
  };

  const onPressSelect = () => {
    SheetManager.show('Gender');
  };

  const onSelectGender = (g: string) => {
    setValue('gender', g as Gender);
    onClose();
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View className="mt-4">
          <AccountInitialsDisplay firstName={firstName} lastName={lastName} />
        </View>
        <View className="m-6 space-y-2">
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
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone Number"
                placeholder="Phone number"
                error={errors.phoneNumber?.message?.toString()}
                onChangeText={v => onChange(v)}
                onBlur={onBlur}
                value={value || ''}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Gender"
                placeholder="Gender"
                error={errors.gender?.message?.toString()}
                onChangeText={v => onChange(v as Gender)}
                onPressIn={onPressSelect}
                onBlur={onBlur}
                value={value || ''}
                isReadOnly
              />
            )}
          />

          <View className="h-1" />
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label="Date of Birth"
                value={value}
                errorMessage={errors.dateOfBirth?.message}
                onValueChange={onChange}
              />
            )}
          />
          <View className="h-4" />
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            label="Save"
          />
        </View>
      </View>
      <ActionSheet
        id="Gender"
        ref={actionSheetRef}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <View className="px-4 pb-8">
          <View className="h-14 w-full justify-center px-4">
            <Text className="text-center text-base">Gender</Text>
          </View>
          <View>
            {genders.map(g => (
              <Pressable
                onPress={() => onSelectGender(g.value)}
                className="h-12 w-full">
                <Text>{g.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ActionSheet>
    </KeyboardAwareScrollView>
  );
};
