import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView, Text } from 'react-native';
import { CommonTypeType } from '../__graphql__/generated';
import { useCommonTypeStore } from '../store/commonType/useCommonTypeStore';

export const GenderSelectionScreen = () => {
  const { setCommonType, commonType } = useCommonTypeStore();

  const { replace } = useRouter();

  useEffect(() => {
    if (commonType) {
      setTimeout(() => {
        replace('/(tabs)/(index)');
      }, 5);
    }
  }, [commonType, replace]);

  const selectGender = (gender: CommonTypeType) => {
    setCommonType(gender);
    // There's a bug atm where App's route isn't initialized yet
    replace('/(tabs)/(index)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1, margin: 30, justifyContent: 'space-between' }}>
        <View style={{ margin: 50, alignContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>KLOTTI</Text>
        </View>

        <View>
          <View style={{ margin: 20 }}>
            <Text style={{ textAlign: 'center' }}>Select a category</Text>
          </View>

          <View>
            <Button title='WOMEN' onPress={() => selectGender('WOMENS')} />
            <Button title='MEN' onPress={() => selectGender('MENS')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenderSelectionScreen;
