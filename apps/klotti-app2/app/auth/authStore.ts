import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  userId?: string;
  token?: string;
  setUserId: (userId?: string) => void;
  setToken: (token?: string) => void;
  clearStore: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: undefined,
      userId: undefined,
      token: undefined,
      setUserId: userId => set(() => ({ userId })),
      setToken: token => set(() => ({ token })),
      clearStore: () => set(() => ({ userId: undefined, token: undefined }))
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
