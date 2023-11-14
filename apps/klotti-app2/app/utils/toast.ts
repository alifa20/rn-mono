import { ToastConfigType } from '@app/config/toastConfig';
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const showToast = ({
  type,
  description,
  position = 'bottom',
  icon
}: ToastConfigType['props'] &
  Omit<ToastConfigType, 'props'> & {
    type: ToastType;
    description: string;
    position?: 'top' | 'bottom';
  }) => {
  return Toast.show({
    type: type,
    autoHide: true,
    text1: description,
    position: position,
    props: {
      icon: {
        iconName: icon?.iconName,
        size: icon?.size || 'small',
        color: icon?.color || 'white'
      }
    }
  });
};
