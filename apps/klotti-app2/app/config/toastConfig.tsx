import { Icon, IconProps } from '@app/components/Icon';
import { Text, View } from 'react-native';

export type ToastConfigType = {
  text1?: string;
  props: { icon?: IconProps };
};
/*
  1. Create the config
*/
export const toastConfig = {
  success: ({ text1, props }: ToastConfigType) => (
    <View className="h-12 rounded-xl bg-black">
      <View className="flex-1 flex-row items-center justify-evenly px-5">
        {props.icon && <Icon {...props.icon} />}
        {/* {!hideIcon && <Icon iconName="check" size="small" color={'white'} />} */}
        <Text className="text-white">{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1, props }: ToastConfigType) => {
    return (
      <View className="h-12 rounded-xl bg-red-500">
        <View className="flex-1 flex-row items-center justify-evenly px-5">
          {props.icon && <Icon {...props.icon} />}
          <Text className="text-white">{text1}</Text>
        </View>
      </View>
    );
  },
  info: ({ text1, props }: ToastConfigType) => {
    return (
      <View className="h-12 rounded-xl bg-gray-500">
        <View className="flex-1 flex-row items-center justify-evenly px-5">
          {props.icon && <Icon {...props.icon} />}
          <Text className="text-white">{text1}</Text>
        </View>
      </View>
    );
  }
};
