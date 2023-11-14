import { Box, Divider, Loading, NavigationItem } from '@klotti/ui';
import React, { ReactNode } from 'react';
import { FlatList } from 'react-native';

type Item = {
  id: string;
  name: string;
  type?: string;
};

type Props = {
  items: Item[];
  onPress: (item: Item) => void;
  loading?: boolean;
  label: (item: Item) => ReactNode;
  EmptyComponent: ReactNode;
};

export const CategoryList = ({
  items,
  onPress,
  loading = false,
  label,
  EmptyComponent
}: Props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      ListEmptyComponent={() => (loading ? <Loading /> : EmptyComponent)}
      renderItem={({ item }) => {
        return (
          <NavigationItem
            key={item.id}
            marginHorizontal={'xs'}
            label={label(item)}
            onPress={() => onPress(item)}
          />
        );
      }}
      ItemSeparatorComponent={() => (
        <Box marginHorizontal={'2xs'}>
          <Divider />
        </Box>
      )}
    />
  );
};
