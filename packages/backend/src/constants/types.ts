import { LoginMethod } from '@prisma/client';

export const FREE_SHIPPING_THRESHOLD = 49;
export const TAX_RATE = 0.1;
export const SHIPPING_FEE = 5;

export const LoginMethods: Record<LoginMethod, string> = {
  GOOGLE: 'google.com',
  FACEBOOK: 'facebook.com',
  EMAIL: 'email',
  APPLE: 'apple.com',
  PHONE_NUMBER: 'phone_number'
};
