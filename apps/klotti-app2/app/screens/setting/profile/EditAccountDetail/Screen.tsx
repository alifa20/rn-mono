import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { EditAccountDetailContainer } from './Container';

// type EditAccountDetailScreenProps = {
//   route: { params: EditAccountDetailScreenParams };
// };

export const EditAccountDetailScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return <EditAccountDetailContainer goBack={goBack} />;
};
