import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useMemo } from 'react';
import { Section } from '../../components/Section';
import { CommonTypeType, useCategoryQuery } from '../../__graphql__/generated';
import { SearchStackParamList } from './stack';

type Props = StackScreenProps<SearchStackParamList, 'SearchSubCategoryScreen'>;

export type SearchSubCategoryScreenProps = {
  categoryId: string;
  categoryName: string;
  commonType: CommonTypeType;
};

export const SearchSubCategoryScreen = (props: Props) => {
  const { route, navigation } = props;
  const { categoryId, commonType, categoryName } = route.params;

  const { data, loading } = useCategoryQuery({
    variables: {
      categoryId,
      commonType: commonType
    }
  });

  const subCategories = useMemo(
    () => data?.category?.subCategories.map(i => i) || [],
    [data]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName
    });
  }, [categoryName, navigation]);

  return (
    <>
      {loading && <ActivityIndicator />}

      {subCategories.length ? (
        <ScrollView>
          <View className="mt-5">
            <Section
              onPress={() => {
                navigation.navigate('ListingStack', {
                  title: `All ${categoryName}`,
                  initialFilters: {
                    subCategoryIds: subCategories.map(i => i.id || '')
                  },
                  commonType
                });
              }}>
              <Text className="text-black">Show all {categoryName}</Text>
              <AntDesign name="right" size={14} color="black" />
            </Section>
            {subCategories.length
              ? subCategories.map(subCategory => (
                  <View key={subCategory.id}>
                    <View className="mx-4 h-px bg-[#EDF1F2]" />
                    <Section
                      key={subCategory.id}
                      onPress={() => {
                        if (!subCategory.id || !subCategory.name) {
                          return;
                        }

                        if (subCategory.productTypes?.length) {
                          navigation.navigate('SearchProductTypeScreen', {
                            subCategoryId: subCategory.id,
                            subCategoryName: subCategory.name,
                            commonType
                          });
                        } else {
                          navigation.navigate('ListingStack', {
                            title: subCategory.name,
                            initialFilters: {
                              subCategoryIds: [subCategory.id]
                            },
                            commonType
                          });
                        }
                      }}>
                      <Text className="text-black">{subCategory.name}</Text>
                      <AntDesign name="right" size={14} color="black" />
                    </Section>
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};
