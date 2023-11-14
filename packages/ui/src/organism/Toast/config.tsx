import React from 'react';
import { IconProps } from '../../atoms';
import { Toast } from './Toast';

export type ToastConfigType = {
  text1?: string;
  text2?: string;
  props: { icon?: IconProps };
};
/*
  1. Create the config
*/
export const toastConfig = {
  success: (props: ToastConfigType) => (
    <Toast backgroundColor={'black'} {...props} />
  ),
  error: (props: ToastConfigType) => {
    return <Toast backgroundColor={'danger'} {...props} />;
  },
  info: (props: ToastConfigType) => {
    return <Toast backgroundColor={'gray'} {...props} />;
  }
};
