import {
  SearchResult,
  SearchType,
  useSearchQuery
} from '@/src/__graphql__/generated';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { useSearchRouter } from '@/src/navigation/useSearchRouter';
import { useCommonType } from '@/src/store/commonType/useCommonType';
import {
  RecentSearch,
  useRecentSearchesStore
} from '@/src/store/recentSearches/recentSearches';
import { Box, SearchBar, SectionItem, Text } from '@klotti/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useEffect, useMemo } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { Container } from '@/src/components';
import { CategoryList } from '@/src/templates';

const SearchSchema = z.object({
  search: z.string({
    required_error: 'Search is required'
  })
});

export type SearchForm = z.infer<typeof SearchSchema>;

const TYPE_MAPPERS: Record<SearchType, string> = {
  BRAND: 'Brand',
  PRODUCT: 'Product',
  CATEGORY: 'Category',
  PRODUCT_TYPE: 'Product Type',
  SUB_CATEGORY: 'Sub Category'
};

export const SearchScreen = () => {
  const router = useRouter();
  const inputRef = useRef<RNTextInput>(null);
  const searchRouter = useSearchRouter();
  const { setRecentSearches, recentSearches, removeRecentSearch } =
    useRecentSearchesStore();

  const localSearch = useLocalSearchParams();

  const { control, handleSubmit } = useForm<SearchForm>({
    values: {
      search:
        localSearch.search === '[search]' ? '' : (localSearch.search as string)
    },
    resolver: zodResolver(SearchSchema)
  });

  const { commonType } = useCommonType();

  const { data } = useSearchQuery({
    variables: {
      input: {
        name: (localSearch.search as string) || '',
        commonTypes: [commonType]
      }
    },
    skip: localSearch.search === '[search]'
  });

  const searching = useMemo(() => {
    return (
      localSearch?.search &&
      localSearch?.search !== '[search]' &&
      localSearch?.search?.length
    );
  }, [localSearch?.search]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const result = useMemo(() => {
    const items = data?.search?.map(item => item as SearchResult) || [];
    return items.slice(0, 15);
  }, [data?.search]);

  const submit = handleSubmit(formData => {
    if (!formData.search) return;
    setRecentSearches({
      name: formData.search,
      type: 'PRODUCT'
    });
    searchRouter.push({
      path: 'products',
      title: formData.search,
      search: formData.search
    });
  });

  const navigateToProducts = (item: RecentSearch) => {
    if (!item.name) return;

    setRecentSearches({
      name: item.name,
      type: item.type,
      ...(item.type !== 'PRODUCT' && { id: item.id })
    });

    searchRouter.push({
      path: 'products',
      title: item.name,
      ...(item.type === 'BRAND' && { brandId: item.id }),
      ...(item.type === 'SUB_CATEGORY' && { subCategoryId: item.id }),
      ...(item.type === 'CATEGORY' && { categoryId: item.id }),
      ...(item.type === 'PRODUCT_TYPE' && { productTypeId: item.id }),
      ...(item.type === 'PRODUCT' && { search: item.name })
    });
  };

  return (
    <Container>
      <KeyboardAwareScrollView stickyHeaderIndices={[0]}>
        <Box height={50} backgroundColor={'white'} marginHorizontal={'xs'}>
          <Controller
            control={control}
            name='search'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchBar
                ref={inputRef}
                value={value}
                placeholder=''
                isSearching={true}
                onChangeText={text => {
                  router.setParams({ search: text });
                  onChange(text);
                }}
                onClear={() => {
                  router.setParams({ search: '' });
                  onChange('');
                }}
                onSubmitEditing={submit}
                onCancel={() => {
                  router.back();
                }}
                error={error?.message}
              />
            )}
          />
        </Box>

        <Box marginTop={'s'}>
          {!searching && (
            <Box gap='s'>
              <Box marginHorizontal={'s'} marginTop={'s'}>
                <Text variant={'title3'}>Recent searches</Text>
              </Box>
              <Box>
                {recentSearches?.map((item, index) => {
                  return (
                    <SectionItem
                      key={index}
                      label={
                        <Box
                          flexDirection={'row'}
                          alignItems={'center'}
                          gap={'3xs'}>
                          <Text>{item.name}</Text>
                          {item.type !== 'PRODUCT' && (
                            <Text color={'gray'}>
                              {TYPE_MAPPERS[item.type as SearchType]}
                            </Text>
                          )}
                        </Box>
                      }
                      marginHorizontal={'s'}
                      onPress={() => {
                        navigateToProducts({
                          name: item.name,
                          id: item.id,
                          type: item.type as SearchType
                        });
                      }}
                      suffixIcon={{
                        icon: {
                          iconName: 'cross',
                          iconType: 'entypo'
                        },
                        onPress: () => {
                          removeRecentSearch(item.name);
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {searching && (
            <CategoryList
              items={result}
              label={item => (
                <Box flexDirection={'row'} alignItems={'center'} gap={'3xs'}>
                  <Text>{item.name}</Text>
                  <Text color={'gray'}>
                    {TYPE_MAPPERS[item.type as SearchType]}
                  </Text>
                </Box>
              )}
              EmptyComponent={<></>}
              onPress={item => {
                navigateToProducts({
                  name: item.name,
                  id: item.id,
                  type: item.type as SearchType
                });
              }}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SearchScreen;
