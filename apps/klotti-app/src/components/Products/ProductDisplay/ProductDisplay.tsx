import { Image, Pressable, Text, View } from 'react-native';
import { DiscountLabel } from '../DiscountLabel';

type ProductDisplayProps = {
  product: any;
  onPress: () => void;
  cardWidth?: number | string;
};

export const ProductDisplay = ({
  product,
  cardWidth = 180,
  onPress
}: ProductDisplayProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className='gap-y-2'>
        <View
          // @ts-ignore
          style={{
            width: cardWidth
          }}
          className='h-56 rounded-2xl bg-gray-400'>
          {product.discount && (
            <DiscountLabel amount={product.discount.amount} />
          )}
          {product.imagesUrls.length ? (
            <Image
              className='h-full w-full rounded-2xl'
              resizeMode='cover'
              source={{
                uri: product.imagesUrls[0],
                cache: 'reload'
              }}
            />
          ) : null}
        </View>
        <View>
          <Text className='font-bold text-black'>{product.brand.name}</Text>
          <Text className='text-black' numberOfLines={2}>
            {product.title}
          </Text>
          <View className='h-2' />
          <View className='flex-row items-center space-x-1'>
            <Text className='text-md text-black'>
              $
              {product.discount
                ? product.price -
                  product.price * (product.discount.amount / 100)
                : product.price}
            </Text>
            {product.discount && (
              <Text className='text-xs text-gray-500 line-through'>
                ${product.price}
                {/* FIXME: Do discount based on percentage or amount */}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
