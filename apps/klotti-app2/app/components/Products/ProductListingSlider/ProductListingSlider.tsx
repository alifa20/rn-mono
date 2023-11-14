import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, ScrollView, View, Text } from 'react-native';
import { ProductDisplay } from '../ProductDisplay';

export type ProductType = {
  id: string;
  brandName: string;
  title: string;
  price: number;
  discount?: {
    type: 'percentage' | 'amount';
    amount: number;
  };
  imagesUrls: string[];
};

export type ProductListingSliderProps = {
  header: string;
  products: any[];
  navigateToProductDetailScreen: (productId: string) => void;
  navigateToHeaderSection: () => void;
};

export const ProductListingSlider = ({
  header,
  products,
  navigateToProductDetailScreen,
  navigateToHeaderSection
}: ProductListingSliderProps) => {
  return (
    <View>
      <Pressable onPress={navigateToHeaderSection}>
        <View className="mx-5 flex-row content-center justify-between">
          <Text className="text-lg font-bold text-black">{header}</Text>
          <View>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </View>
      </Pressable>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="mx-5 my-3 flex-row space-x-5">
          {products.map(product => (
            <View key={product.id}>
              <ProductDisplay
                onPress={() => navigateToProductDetailScreen(product.id)}
                key={product.id}
                product={product}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
