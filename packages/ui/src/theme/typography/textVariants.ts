import { TextStyle } from 'react-native';
import { Fonts } from './fonts';

export const title1: TextStyle = {
  fontFamily: Fonts.Bold,
  fontSize: 24,
  fontWeight: '600',
  letterSpacing: 1
};

export const title2: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 16,
  fontWeight: '600',
  letterSpacing: 0
};

export const title3: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 14,
  fontWeight: '600',
  letterSpacing: 0
};

const paragraph1: TextStyle = {
  fontFamily: Fonts.Medium,
  fontSize: 16,
  fontWeight: '500',
  letterSpacing: 0
};

const paragraph2: TextStyle = {
  fontFamily: Fonts.Medium,
  fontSize: 14,
  fontWeight: '500'
};

const largeButton: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 20,
  fontWeight: '600'
};

const mediumButton: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 16,
  fontWeight: '600'
};

const smallButton: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 12,
  fontWeight: '600'
};

const placeholder = {
  fontFamily: Fonts.Medium,
  fontSize: 14,
  fontWeight: '500'
};

const caption: TextStyle = {
  fontFamily: Fonts.Medium,
  fontSize: 12,
  fontWeight: '500'
};

const discount: TextStyle = {
  fontFamily: Fonts.Medium,
  fontSize: 12,
  fontWeight: '500'
};

const label: TextStyle = {
  fontFamily: Fonts.SemiBold,
  fontSize: 14,
  fontWeight: '600'
};

export const textVariants = {
  title1,
  title2,
  title3,
  paragraph1,
  paragraph2,
  largeButton,
  mediumButton,
  smallButton,
  caption,
  placeholder,
  discount,
  label,
  defaults: paragraph2
};
