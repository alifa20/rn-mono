import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect, useMemo } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { Section } from '../../components/Section';
import {
  CommonTypeType,
  useSubCategoryQuery
} from '../../__graphql__/generated';
import { SearchStackParamList } from './stack';

type Props = StackScreenProps<SearchStackParamList, 'SearchProductTypeScreen'>;

export type SearchProductTypeScreenProps = {
  subCategoryId: string;
  subCategoryName: string;
  commonType: CommonTypeType;
};

export const SearchProductTypeScreen = (props: Props) => {
  const { route, navigation } = props;
  const { subCategoryId, commonType, subCategoryName } = route.params;

  const { data, loading } = useSubCategoryQuery({
    variables: {
      subCategoryId,
      commonType
    }
  });

  const productTypes = useMemo(
    () => data?.subCategory?.productTypes?.map(i => i) || [],
    [data]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: subCategoryName
    });
  }, [subCategoryName, navigation]);

  return (
    <>
      {loading && <ActivityIndicator />}

      {productTypes.length ? (
        <ScrollView>
          <View className="mt-5">
            <Section
              onPress={() => {
                navigation.navigate('ListingStack', {
                  title: `All ${subCategoryName}`,
                  initialFilters: {
                    productTypeIds: productTypes.map(i => i.id || '')
                  },
                  commonType
                });
              }}>
              <Text className="text-black">Show all {subCategoryName}</Text>
              <AntDesign name="right" size={14} color="black" />
            </Section>
            {productTypes.map(productType => (
              <View key={productType.id}>
                <View className="mx-4 h-px bg-[#EDF1F2]" />
                <Section
                  key={productType.id}
                  onPress={() => {
                    if (productType && productType.id && productType.name) {
                      navigation.navigate('ListingStack', {
                        title: productType.name,
                        initialFilters: {
                          productTypeIds: [productType.id]
                        },
                        commonType
                      });
                    }
                  }}>
                  <Text className="text-black">{productType.name}</Text>
                  <AntDesign name="right" size={14} color="black" />
                </Section>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};
