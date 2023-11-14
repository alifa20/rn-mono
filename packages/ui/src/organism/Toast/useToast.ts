import Toast from 'react-native-toast-message';
import { IconProps } from '../../atoms';

type ToastProps = {
  type?: 'success' | 'error' | 'info';
  position?: 'top' | 'bottom';
  visibilityTime?: number;
};

export const useToast = (props?: ToastProps) => {
  const type = props?.type || 'success';
  const position = props?.position || 'bottom';
  const visibilityTime = props?.visibilityTime || 3000;

  const show = ({
    title,
    description,
    icon
  }: {
    title: string;
    description?: string;
    icon?: IconProps;
  }) => {
    Toast.show({
      type: type,
      position: position,
      text1: title,
      text2: description,
      props: {
        icon: icon
      },
      visibilityTime: visibilityTime
    });
  };

  const hide = () => {
    Toast.hide();
  };

  return {
    show,
    hide
  };
};
