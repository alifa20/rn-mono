import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParamList } from '../stack';
import { Text, View } from 'react-native';
import { Spacer } from '@app/components/Spacer';
import { Button } from '@app/components/buttons/Button';

type Props = StackScreenProps<SettingsStackParamList, 'UnauthenticatedScreen'>;

export const UnauthenticatedScreen = (props: Props) => {
  const { navigation } = props;

  const navigateToSignInScreen = () => {
    navigation.navigate('AccountStack', {
      screen: 'LoginScreen'
    });
  };

  const navigateToSignUpScreen = () => {
    navigation.navigate('AccountStack', {
      screen: 'RegisterScreen'
    });
  };

  const navigateToHelpScreen = () => {};

  return (
    <View className="flex-1 justify-center">
      <View>
        <Text className="text-center">Log in or create an account?</Text>
        <Spacer size="large" />
        <Button label={'SIGN UP'} onPress={navigateToSignUpScreen} />
        <Spacer size="small" />
        <Button label={'LOG IN'} onPress={navigateToSignInScreen} />
        <Button label={'Need help?'} onPress={navigateToHelpScreen} />
      </View>
    </View>
  );
};
