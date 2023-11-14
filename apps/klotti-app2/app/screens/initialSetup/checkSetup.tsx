import { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../app/routes';
import { Loading } from '@app/components/Loading';
import { useCommonType } from '@app/store/commonType/useCommonType';

type Props = StackScreenProps<RootStackParamList, 'CheckSetupScreen'>;

export const CheckSetupScreen = (props: Props) => {
  const { navigation } = props;
  const { commonType } = useCommonType();

  useEffect(() => {
    const navigationPath = async () => {
      if (commonType) {
        return navigation.navigate('GenderSelectionScreen');
      }

      navigation.navigate('App');
    };

    navigationPath();
  }, [commonType, navigation]);

  return <Loading fullScreen />;
};
