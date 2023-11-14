import { useCategoriesQuery } from '@/src/__graphql__/generated';
import { Container } from '@/src/components';
import { useSearchRouter } from '@/src/navigation/useSearchRouter';
import { useCommonType } from '@/src/store/commonType/useCommonType';
import { CategoryList } from '@/src/templates';
import { Box, SearchBar, TabBar, Text } from '@klotti/ui';
import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TabOptions = ['Womens', 'Mens'];

export const SearchScreen = () => {
  const searchRouter = useSearchRouter();
  const { commonType: storeCommonType } = useCommonType();

  const [activeTab, setActiveTab] = React.useState(
    storeCommonType === 'WOMENS' ? 0 : 1
  );

  const commonType = activeTab === 0 ? 'WOMENS' : 'MENS';

  const { data, loading } = useCategoriesQuery({
    variables: {
      commonType: commonType
    }
  });

  const categories = useMemo(() => {
    return data?.categories.map(item => item);
  }, [data?.categories]);

  const listItems = useMemo(() => {
    if (!categories) return [];
    const formatted =
      categories?.map(item => ({
        id: item.id,
        name: item.name
      })) || [];
    const sale = {
      id: 'sale',
      name: 'Sale'
    };

    return [sale, ...formatted];
  }, [categories]);

  return (
    <Container gap='s'>
      <Box marginHorizontal={'xs'}>
        <TouchableWithoutFeedback
          onPress={() =>
            searchRouter.push({
              path: '[search]',
              title: 'Search'
            })
          }>
          <SearchBar
            placeholder='Search by Brand, Name...'
            isSearching={false}
          />
        </TouchableWithoutFeedback>

        <Box marginTop={'l'} marginHorizontal={'2xs'}>
          <TabBar
            tabs={TabOptions}
            setActiveIndex={setActiveTab}
            activeIndex={activeTab}
            tranformXValue={0}
            width={{
              phone: '40%',
              tablet: '50%',
              largeTablet: '70%'
            }}
            height={40}
          />
        </Box>
      </Box>

      <CategoryList
        items={listItems}
        EmptyComponent={<Text>Empty Component</Text>}
        label={item =>
          item.id === 'sale' ? (
            <Text color={'danger'}>Sale</Text>
          ) : (
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text>{item.name}</Text>
            </Box>
          )
        }
        onPress={item => {
          if (item.id === 'sale')
            return searchRouter.push({
              path: 'products',
              title: 'Sale',
              sale: true,
              commonType: commonType
            });
          else {
            searchRouter.push({
              path: 'sub-category',
              title: item.name,
              categoryId: item.id,
              commonType: commonType
            });
          }
        }}
        loading={loading}
      />
    </Container>
  );
};

export default SearchScreen;
