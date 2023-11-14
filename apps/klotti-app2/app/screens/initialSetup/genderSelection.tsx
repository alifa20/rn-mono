import { StackScreenProps } from '@react-navigation/stack';
import { CommonTypeType } from '@app/__graphql__/generated';
import { Spacer } from '@app/components/Spacer';
import { SafeAreaView, View, Text } from 'react-native';
import { RootStackParamList } from '../app/routes';
import { Button } from '@app/components/buttons/Button';
import { useCommonTypeStore } from '@app/store/commonType/useCommonTypeStore';

type Props = StackScreenProps<RootStackParamList, 'GenderSelectionScreen'>;

export const GenderSelectionScreen = (props: Props) => {
  const { navigation } = props;
  const { setCommonType } = useCommonTypeStore();

  const selectGender = (gender: CommonTypeType) => {
    setCommonType(gender);
    // There's a bug atm where App's route isn't initialized yet
    navigation.navigate('App');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: 30, justifyContent: 'space-between' }}>
        <View style={{ margin: 50, alignContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>KLOTTI</Text>
        </View>

        <View>
          <View style={{ margin: 20 }}>
            <Text style={{ textAlign: 'center' }}>Select a category</Text>
          </View>
          <View>
            <Button label="WOMEN" onPress={() => selectGender('WOMENS')} />
            <Spacer />
            <Button label="MEN" onPress={() => selectGender('MENS')} />
            <Spacer />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
