import { Collection, Product } from '@app/__graphql__/generated';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { Image } from '@app/components/Image';
import { ProductDisplay } from '@app/components/Products/ProductDisplay';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from './stack';

type Props = {
  route: {
    params: {
      collection: Collection;
    };
  };
};

export type CollectionDetailScreenProps = { collection: Collection };
export type StackProps = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

export const CollectionDetailScreen = ({ route }: Props) => {
  const { collection } = route.params;
  const navigation = useNavigation<StackProps>();
  const { width } = Dimensions.get('window');
  const cardWidth = width / 2 - 24;

  const renderHeader = () => {
    return (
      <View className="mb-4 mt-4 px-4">
        <Image
          className="h-72 w-full rounded-md"
          source={{
            uri: collection.imageUrl || ''
          }}
        />
        <View className="mt-4">
          <Text className="text-lg font-bold">{collection.title}</Text>
          <Text className="text-sm text-gray-500">
            {collection.description}
          </Text>
          <Text className="mt-4 text-lg font-bold">Collection items</Text>
        </View>
      </View>
    );
  };

  const renderListEmpty = () => {
    return <Text>No data</Text>;
  };

  const navigateToProductDetailScreen = (productId: string) => {
    navigation.navigate('ProductDetailScreen', {
      productId
    });
  };

  const renderItem = (item: Product | null) => {
    if (!item) {
      return <></>;
    }
    return (
      <View className="my-2" style={{ width: cardWidth }}>
        <ProductDisplay
          onPress={() => navigateToProductDetailScreen(item.id)}
          cardWidth="100%"
          product={item}
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={collection.products}
        numColumns={2}
        columnWrapperStyle={{
          marginHorizontal: 16,
          justifyContent: 'space-between'
        }}
        ListEmptyComponent={renderListEmpty}
        keyExtractor={item => item?.id || ''}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};
