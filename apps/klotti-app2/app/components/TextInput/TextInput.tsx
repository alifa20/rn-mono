import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  TextInput as RNTextInput,
  Text,
  TextInputProps
} from 'react-native';
import { AppColor } from '../../utils/color';
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  placeholder: string;
  iconType?: 'feather' | 'materialicons';
  iconSuffix?: JSX.Element | undefined;
  iconNameSuffix?: string | keyof typeof MaterialIcons | keyof typeof Feather;
  onIconSuffixPress?: () => void;
  isReadOnly?: boolean;
};

export const TextInput = forwardRef<RNTextInput, Props>(
  (
    {
      label,
      error,
      placeholder,
      iconSuffix,
      iconNameSuffix,
      iconType = 'materialicons',
      isReadOnly,
      onIconSuffixPress,
      ...props
    }: Props,
    ref
  ) => {
    const suffixPadding = iconSuffix || iconNameSuffix ? 46 : 16;
    return (
      <View>
        {label ? (
          <View focusable className="w-full flex-row justify-between">
            <Text className="mb-1 text-sm text-gray-400">{label}</Text>
          </View>
        ) : null}
        <View className="relative">
          <RNTextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={
              error
                ? AppColor.inputPlaceholderError
                : AppColor.inputPlaceholderDefault
            }
            editable={!isReadOnly}
            autoCapitalize="none"
            className="rounded-xl focus:border focus:border-black"
            style={{
              color: 'black',
              backgroundColor: error
                ? AppColor.inputBgError
                : AppColor.inputBgDefault,
              height: 50,
              borderColor: error
                ? AppColor.inputBorderError
                : AppColor.inputBorderDefault,
              fontSize: 14,
              paddingLeft: 16,
              paddingRight: suffixPadding
            }}
            {...props}
          />

          <View className="absolute right-3 h-full flex-row items-center justify-center">
            {(iconSuffix || iconNameSuffix) &&
              (!iconSuffix ? (
                <View className="flex-row items-center justify-center">
                  {iconType === 'materialicons' ? (
                    <MaterialIcons
                      name={iconNameSuffix as keyof typeof MaterialIcons}
                      size={24}
                      onPress={onIconSuffixPress}
                      color={
                        error
                          ? AppColor.inputIconError
                          : AppColor.inputIconDefault
                      }
                    />
                  ) : (
                    <Feather
                      name={iconNameSuffix as keyof typeof Feather}
                      size={24}
                      onPress={onIconSuffixPress}
                      color={
                        error
                          ? AppColor.inputIconError
                          : AppColor.inputIconDefault
                      }
                    />
                  )}
                </View>
              ) : (
                iconSuffix
              ))}
          </View>
        </View>
        {error ? (
          <Text
            className="my-1 text-xs"
            style={{ color: AppColor.errorText, fontSize: 12 }}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
);
