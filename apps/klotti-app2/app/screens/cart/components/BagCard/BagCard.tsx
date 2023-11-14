import React, { useMemo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SelectOption } from '@app/components/SelectOption';
import { Product, Size } from '@app/__graphql__/generated';
import { Image } from '@app/components/Image';
import Feather from 'react-native-vector-icons/Feather';

type BagCardProps = {
  product: Product;
  onPress?: () => void;
  selectedSize: Size;
  onUpdateProductSize: (originalSize: Size, value: Size) => void;
  selectedQuantity: string;
  onUpdateProductQuantity: (qty: number, size: Size) => void;
  onMoveProductToWishlist: () => void;
  onRemoveFromBag: () => void;
};

export const BagCard = ({
  product,
  onPress,
  selectedSize,
  onUpdateProductSize,
  selectedQuantity,
  onUpdateProductQuantity,
  onMoveProductToWishlist,
  onRemoveFromBag
}: BagCardProps) => {
  const selectableQuantity = 10;

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

  const quantityOptions = useMemo(
    () =>
      Array.from({ length: selectableQuantity }, (_, i) => i + 1).map(item => ({
        label: item.toString(),
        value: item.toString()
      })),
    [selectableQuantity]
  );

  const onSizeChange = (value: Size) => {
    onUpdateProductSize(selectedSize, value);
  };

  const onQtyChange = (value: string) => {
    onUpdateProductQuantity(Number(value), selectedSize);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View className="flex-row items-center space-x-4">
          <Image source={product.imagesUrls} className="h-28 w-28 rounded-lg" />
          <View className="flex flex-1 ">
            <View className="flex-row justify-between">
              <Text className="font-bold text-black">{product.brand.name}</Text>
              <TouchableOpacity onPress={onRemoveFromBag}>
                <Feather name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View className="space-y-2">
              <Text className="text-black">{product.title}</Text>
              <Text className="text-black">{product.price}</Text>

              <View className="mt-auto flex-row">
                <SelectOption
                  title="Qty"
                  innerTitle="Quantity"
                  options={quantityOptions}
                  onValueChange={onQtyChange}
                  selectedValue={selectedQuantity}
                />
                <View className="w-2" />
                <SelectOption
                  title="Size"
                  innerTitle="Size"
                  options={sizeOptions}
                  onValueChange={onSizeChange}
                  selectedValue={selectedSize}
                />
              </View>
            </View>
          </View>
        </View>
        <Text
          onPress={onMoveProductToWishlist}
          className="mt-4 text-center text-gray-500 underline">
          Move to wishlist
        </Text>
      </View>
    </TouchableOpacity>
  );
};
