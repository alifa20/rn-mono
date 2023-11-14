import { CommonTypeType } from '@/src/__graphql__/generated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CommonTypeState = {
  commonType?: CommonTypeType;
  setCommonType: (commonType?: CommonTypeType) => void;
};

export const useCommonTypeStore = create<CommonTypeState>()(
  persist(
    set => ({
      commonType: undefined,
      setCommonType: commonType => set(() => ({ commonType }))
    }),
    {
      name: 'CommonType-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
