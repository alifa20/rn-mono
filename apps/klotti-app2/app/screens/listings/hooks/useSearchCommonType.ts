import { CommonTypeType } from '@app/__graphql__/generated';
import { create } from 'zustand';

type State = {
  customCommonType?: CommonTypeType;
  setCustomCommonType: (commonType?: CommonTypeType) => void;
};

export const useCustomCommonTypeStore = create<State>()(set => ({
  customCommonType: undefined,
  setCustomCommonType: customCommonType => set(() => ({ customCommonType }))
}));
