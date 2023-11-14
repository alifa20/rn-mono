import { FlashList, FlashListProps } from '@shopify/flash-list';
import React from 'react';
import { Box, BoxProps } from '../../atoms';

export type ListProps<T> = Omit<FlashListProps<T>, 'renderItem'> & {
  boxProps?: BoxProps;
  data: T[];
  ItemComponent: React.FC<{ item: T }>;
  itemProps?: BoxProps;
  numColumns: number;
  gap?: BoxProps['margin'];
};

export const List = <T,>({
  data,
  itemProps,
  numColumns,
  ItemComponent,
  gap = '3xs',
  ...props
}: ListProps<T>) => {
  return (
    <Box flex={1} marginHorizontal={'3xs'} {...props.boxProps}>
      <FlashList
        data={data}
        numColumns={numColumns}
        onEndReachedThreshold={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Box margin={gap} {...itemProps}>
            <ItemComponent item={item} />
          </Box>
        )}
        {...props}
      />
    </Box>
  );
};
