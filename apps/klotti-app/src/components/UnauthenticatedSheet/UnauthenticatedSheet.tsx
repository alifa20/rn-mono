import { BottomSheet, Text, useBottomSheet } from '@klotti/ui';
import React, { createContext } from 'react';

type UnauthenticatedSheetProviderType = {
  children: React.ReactNode;
};

export type UnauthenticatedSheetContextType = {
  show: () => void;
};

export const UnauthenticatedSheetContext =
  createContext<UnauthenticatedSheetContextType>({
    show: () => null
  });

export const UnauthenticatedSheetProvider = ({
  children
}: UnauthenticatedSheetProviderType) => {
  const { show, ref } = useBottomSheet();

  return (
    <UnauthenticatedSheetContext.Provider
      value={{
        show
      }}>
      <BottomSheet ref={ref}>
        <Text>Hello</Text>
      </BottomSheet>
      {children}
    </UnauthenticatedSheetContext.Provider>
  );
};
