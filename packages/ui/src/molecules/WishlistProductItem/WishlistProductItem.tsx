import React from 'react';
import { Box, Button, OptionType, Text, Thumbnail } from '../../atoms';
import { formatAsCurrency } from '../../utils';
import { TouchableOpacity } from 'react-native';
import { SelectOptionSheet } from '../SelectOptionSheet';
import { useBottomSheet } from '../BottomSheet';

type WishlistProductItemProps = {
  title: string;
  price: number;
  description: string;
  onItemPress: () => void;
  onAddToBag: ({ size }: { size: OptionType['value'] }) => void;
  onRemove: () => void;
  sizeOptions: OptionType[];
  addToBagLoading?: boolean;
  removeLoading?: boolean;
};

export const WishlistProductItem = ({
  title,
  description,
  price,
  onItemPress,
  onAddToBag,
  onRemove,
  sizeOptions,
  addToBagLoading,
  removeLoading
}: WishlistProductItemProps) => {
  const { ref, show, hide } = useBottomSheet();

  return (
    <>
      <TouchableOpacity onPress={onItemPress}>
        <Box flexDirection={'row'} gap='xs'>
          <Thumbnail
            image={{
              source: 'https://picsum.photos/500'
            }}
            width={116}
            height={116}
          />

          <Box marginVertical={'3xs'} flex={1}>
            <Box gap={'3xs'}>
              <Box flexDirection={'row'} justifyContent={'space-between'}>
                <Box
                  marginRight={'2xs'}
                  flex={1}
                  width={{
                    phone: 150,
                    tablet: '70%'
                  }}>
                  <Text variant={'title2'} numberOfLines={1}>
                    {title}
                  </Text>
                </Box>
                <Text variant={'title2'}>
                  {formatAsCurrency({
                    value: price,
                    digits: 2
                  })}
                </Text>
              </Box>
              <Box height={32}>
                <Text variant={'paragraph2'} numberOfLines={1}>
                  {description}
                </Text>
              </Box>
            </Box>

            <Box flexDirection={'row'} gap='3xs' flex={1}>
              <Button
                size='small'
                variants='tertiary'
                label='Add to Bag'
                onPress={() => {
                  if (sizeOptions.length === 1) {
                    return onAddToBag({
                      size: sizeOptions[0].value
                    });
                  }
                  show();
                }}
                loading={addToBagLoading}
                disabled={removeLoading}
              />
              <Button
                size='small'
                label='Remove'
                variants='outline'
                onPress={onRemove}
                loading={removeLoading}
                disabled={addToBagLoading}
              />
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
      <SelectOptionSheet
        ref={ref}
        options={sizeOptions}
        hideSheet={hide}
        onValueChange={(value: OptionType['value']) => {
          onAddToBag({
            size: value
          });
          hide();
        }}
        title='Select size'
      />
    </>
  );
};
