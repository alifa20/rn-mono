import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from '@app/components/Image';
import { Product, Size } from '../../../../__graphql__/generated';
import { Button } from '@app/components/buttons/Button';
import { SelectOption } from '@app/components/SelectOption';

type WishListCardProps = {
  product: Product;
  onPress: () => void;
  onAddToCartPress: (size: Size) => void;
  onRemovePress: () => void;
};

export const WishListCard = ({
  product,
  onPress,
  onAddToCartPress,
  onRemovePress
}: WishListCardProps) => {
  const sizeOptions = useMemo(
    () =>
      product.subProducts
        .map(
          item =>
            item &&
            item.size && {
              label: item.size,
              value: item.size
            }
        )
        .filter((i): i is { label: Size; value: Size } => i !== undefined),
    [product.subProducts]
  );

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row items-center space-x-4">
          <Image source={product.imagesUrls} className="h-28 w-28 rounded-lg" />
          <View className="flex-1 space-y-3">
            <View className="flex-row justify-between">
              <Text className="font-bold text-black">{product.brand.name}</Text>
              <Text className="text-black">${product.price}</Text>
            </View>
            <Text className="text-gray-500">{product.title}</Text>

            <View className="flex-row">
              <SelectOption
                innerTitle="Size"
                onValueChange={onAddToCartPress}
                renderCustomButton={
                  <Button
                    label="Add To Cart"
                    type="outline"
                    size="small"
                    onPress={() => {}}
                  />
                }
                options={sizeOptions}
                selectedValue={sizeOptions[0].value}
                title="Size"
              />
              <View className="w-2" />
              <Button
                label="Remove"
                type="critical"
                size="small"
                onPress={onRemovePress}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
