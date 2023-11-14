import { createTheme } from '@shopify/restyle';
import { textVariants } from './typography';
import { colors } from './colors';
import { bordierRadii, spacing } from './styles';

const theme = createTheme({
  colors: colors,
  spacing: spacing,
  borderRadii: bordierRadii,
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024
  },
  textVariants: textVariants,
  shadows: {
    default: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    md: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)',
    lg: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)'
  }
});

export type ThemeType = typeof theme;
export default theme;
