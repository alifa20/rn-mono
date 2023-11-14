import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { ScrollView, FlatList, View, Text, Pressable } from 'react-native';
import { Section } from '../../components/Section';
import {
  useCategoriesQuery,
  useSearchQuery
} from '../../__graphql__/generated';
import { SearchStackParamList } from './stack';
import { TextInput } from '@app/components/TextInput';
import { Divider } from '@app/components/Divider';
import { Loading } from '@app/components/Loading';
import { useCommonType } from '@app/store/commonType/useCommonType';
import { useCustomCommonTypeStore } from '../listings/hooks/useSearchCommonType';

type Props = StackScreenProps<SearchStackParamList, 'SearchScreen'>;

const SearchTypeSelector = {
  BRAND: 'Designer',
  CATEGORY: 'Category',
  PRODUCT: 'Product',
  PRODUCT_TYPE: 'Category',
  SUB_CATEGORY: 'Category'
};

export const SearchScreen = (props: Props) => {
  const { navigation } = props;

  const [searchText, setSearchText] = useState('');
  const { commonType } = useCommonType();
  const { setCustomCommonType } = useCustomCommonTypeStore();

  const [index, setIndex] = React.useState(commonType === 'WOMENS' ? 0 : 1);

  const { data: categoriesData, loading: loadingCategories } =
    useCategoriesQuery({
      variables: {
        commonType: index === 0 ? 'WOMENS' : 'MENS'
      },
      notifyOnNetworkStatusChange: true
    });

  const { data, loading: loadingSearch } = useSearchQuery({
    variables: {
      input: {
        name: searchText,
        commonTypes: [index === 0 ? 'WOMENS' : 'MENS']
      }
    },
    skip: !searchText
  });

  const categories = useMemo(
    () => categoriesData?.categories.map(i => i) || [],
    [categoriesData?.categories]
  );

  const searchResults = useMemo(
    () => data?.search?.map(i => i) || [],
    [data?.search]
  );

  return (
    <>
      <View className="mx-4 my-2">
        <TextInput
          placeholder="Search by Brand, Name..."
          iconType="feather"
          onChangeText={setSearchText}
          onSubmitEditing={() =>
            navigation.navigate('ListingStack', {
              title: searchText,
              description: searchText,
              initialFilters: {
                name: searchText
              },
              commonType: index === 0 ? 'WOMENS' : 'MENS'
            })
          }
          {...(searchText && {
            iconNameSuffix: 'x',
            onIconSuffixPress: () => setSearchText('')
          })}
          value={searchText}
        />
      </View>

      <View className="mx-5 mt-5 flex-row">
        <Tab
          label="WOMEN"
          onPress={() => {
            setIndex(0);
            setCustomCommonType('WOMENS');
          }}
          isSelected={index === 0}
        />
        <View className="w-2" />
        <Tab
          label="MEN"
          onPress={() => {
            setIndex(1);
            setCustomCommonType('MENS');
          }}
          isSelected={index === 1}
        />
        <View className="absolute bottom-0 left-0 right-0 top-7 h-px bg-gray-100" />
      </View>

      {loadingCategories ? (
        <View className="flex-1 justify-center">
          <Loading />
        </View>
      ) : (
        <>
          {categoriesData && !searchText && (
            <ScrollView>
              <View className="mt-5">
                <Section
                  onPress={() => {
                    navigation.navigate('ListingStack', {
                      title: 'Sale',
                      commonType: index === 0 ? 'WOMENS' : 'MENS',
                      initialFilters: {
                        isDiscountProductsOnly: true
                      }
                    });
                  }}>
                  <Text className="text-red-600">Sale</Text>
                  <AntDesign name="right" size={12} color="black" />
                </Section>
                <View className="mx-5 h-px bg-gray-100" />
                {categories.map(category => (
                  <View key={category.id}>
                    <Section
                      onPress={() =>
                        navigation.navigate('SearchSubCategoryScreen', {
                          categoryId: category.id,
                          categoryName: category.name,
                          commonType: index === 0 ? 'WOMENS' : 'MENS'
                        })
                      }>
                      <Text className="text-black">{category.name}</Text>
                      <AntDesign name="right" size={12} color="black" />
                    </Section>
                    <View className="mx-5 h-px bg-gray-100" />
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
          {!loadingSearch &&
            searchText.length > 0 &&
            (searchResults.length ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 10
                }}
                ItemSeparatorComponent={() => <Divider />}
                data={searchResults}
                renderItem={result => (
                  <Section
                    key={result.item?.id}
                    onPress={() => {
                      navigation.navigate('ListingStack', {
                        title: result.item?.name || '',
                        description: result.item?.name || '',
                        initialFilters: {
                          categoryIds:
                            (result.item?.type === 'CATEGORY' && [
                              result.item?.id
                            ]) ||
                            undefined,
                          subCategoryIds:
                            (result.item?.type === 'SUB_CATEGORY' && [
                              result.item?.id
                            ]) ||
                            undefined,
                          productTypeIds:
                            (result.item?.type === 'PRODUCT_TYPE' && [
                              result.item?.id
                            ]) ||
                            undefined,
                          brandIds:
                            (result.item?.type === 'BRAND' && [
                              result.item?.id
                            ]) ||
                            undefined
                        },
                        commonType: index === 0 ? 'WOMENS' : 'MENS'
                      });
                    }}>
                    <Text>
                      {result.item?.name}{' '}
                      <Text className="text-gray-500">
                        {result.item?.type &&
                          SearchTypeSelector[result.item.type]}
                      </Text>
                    </Text>
                    <AntDesign name="right" size={12} color="black" />
                  </Section>
                )}
              />
            ) : null)}
        </>
      )}
    </>
  );
};

const Tab = ({
  isSelected,
  onPress,
  label
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <View className="content-center space-y-2">
        <Text className={`${isSelected ? 'font-bold' : ''} text-black`}>
          {label}
        </Text>
        {isSelected && <View className="h-1 rounded-md bg-black" />}
      </View>
    </Pressable>
  );
};
