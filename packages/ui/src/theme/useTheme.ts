import { useTheme as useShopifyTheme } from '@shopify/restyle';
import { ThemeType } from '../theme';

export const useTheme = () => {
  return useShopifyTheme<ThemeType>();
};
