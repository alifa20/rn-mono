import { SearchType } from '@/src/__graphql__/generated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type RecentSearch = {
  name: string;
  type: SearchType;
  id?: string;
};

type RecentSearchesState = {
  recentSearches?: RecentSearch[];
  setRecentSearches: (search: RecentSearch) => void;
  removeRecentSearch: (search: RecentSearch['name']) => void;
};

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    set => ({
      recentSearches: [],
      setRecentSearches: (search: { name: string; type: SearchType }) => {
        set(state => {
          const newRecentSearches = state.recentSearches?.filter(
            recentSearch => recentSearch.name !== search.name
          );
          return {
            recentSearches: [search, ...(newRecentSearches ?? [])]
          };
        });
      },
      removeRecentSearch: (searchName: string) => {
        set(state => {
          const newRecentSearches = state.recentSearches?.filter(
            recentSearch => recentSearch.name !== searchName
          );
          return {
            recentSearches: newRecentSearches
          };
        });
      }
    }),
    {
      name: 'RecentSearches-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
