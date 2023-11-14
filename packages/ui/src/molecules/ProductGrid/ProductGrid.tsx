import React from 'react';
import {
  Box,
  BoxProps,
  ImageProps,
  Pressable,
  Text,
  TagProps,
  Thumbnail
} from '../../atoms';
import { formatAsCurrency } from '../../utils';

export type ProductGridSize = 'medium' | 'large';

export type ProductGridProps = BoxProps & {
  image: ImageProps;
  tag?: TagProps;
  brandName: string;
  title: string;
  price: number;
  discountedPrice?: number;
  onPress: () => void;
};

const ASPECT_RATIO = 6 / 7;

export const ProductGrid = ({
  image,
  tag,
  brandName,
  title,
  price,
  discountedPrice,
  onPress,
  ...props
}: ProductGridProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box backgroundColor={'white'} borderRadius={'s'} {...props}>
        <Thumbnail
          image={{
            ...image,
            aspectRatio: ASPECT_RATIO
          }}
          tag={tag}
          width={'100%'}
          aspectRatio={ASPECT_RATIO}
        />
        <Box gap={'xs'} marginVertical={'xs'} marginHorizontal={'3xs'}>
          <Box gap='3xs'>
            <Text variant='title2'>{brandName}</Text>
            <Box height={32}>
              <Text variant={'paragraph2'} numberOfLines={2} lineHeight={16}>
                {title}
              </Text>
            </Box>
          </Box>
          <Box flexDirection={'row'} alignItems={'center'} gap={'4xs'}>
            {discountedPrice ? (
              <>
                <Text variant='title2' textAlign={'center'}>
                  {formatAsCurrency({
                    value: discountedPrice
                  })}
                </Text>
                <Text
                  variant={'paragraph2'}
                  textAlign={'center'}
                  color={'gray'}
                  textDecorationLine={'line-through'}>
                  {formatAsCurrency({
                    value: price
                  })}
                </Text>
              </>
            ) : (
              <>
                <Text variant='title2' textAlign={'center'}>
                  {formatAsCurrency({
                    value: price
                  })}
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
