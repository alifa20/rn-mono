import { Alert } from 'react-native';

export const showAlert = (title = 'Error', message: string) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Okay',
        onPress: () => {}
      }
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.'
        )
    }
  );
};

export const showAlertConfirm = (
  title: string,
  message: string,
  destructiveTitle: string,
  cancelTitle: string,
  onConfirm = () => {},
  onCancel = () => {}
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: destructiveTitle,
        onPress: onConfirm,
        style: 'destructive'
      },
      {
        text: cancelTitle,
        onPress: onCancel
      }
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.'
        )
    }
  );
};
