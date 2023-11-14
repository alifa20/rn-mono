import { createStackNavigator } from '@react-navigation/stack';
import { CheckSetupScreen } from './checkSetup';
import { GenderSelectionScreen } from './genderSelection';

export type InitialSetupStackParamList = {
  CheckSetupScreen: undefined;
  GenderSelectionScreen: undefined;
};

export const InitialSetupStack = () => {
  const Stack = createStackNavigator<InitialSetupStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="CheckSetupScreen" component={CheckSetupScreen} />
      <Stack.Screen
        name="GenderSelectionScreen"
        component={GenderSelectionScreen}
      />
    </Stack.Navigator>
  );
};
