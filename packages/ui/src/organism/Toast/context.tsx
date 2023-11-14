import React, { ReactNode, createContext } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config';

const ToastContext = createContext({});

export type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <ToastContext.Provider value={{}}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  );
};
