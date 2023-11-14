import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

export const LoadingBlanket = () => {
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View className="flex-1 justify-center bg-black opacity-30">
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
};
