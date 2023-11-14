import { PropValue, useResponsiveProp } from '@shopify/restyle';
import { ThemeType } from './theme';

export const useResponsiveValue = <T extends PropValue>(
  props: Record<keyof ThemeType['breakpoints'], T>
) => {
  return useResponsiveProp<ThemeType, T>({
    largeTablet: props.largeTablet,
    tablet: props.tablet,
    phone: props.phone
  });
};
