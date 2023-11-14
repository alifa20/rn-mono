import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import React from 'react';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  return <ShopifyThemeProvider theme={theme}>{children}</ShopifyThemeProvider>;
};
