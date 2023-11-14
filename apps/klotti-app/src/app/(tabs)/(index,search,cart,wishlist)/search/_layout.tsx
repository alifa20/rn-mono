import { Stack, useRouter } from 'expo-router';
import { BackButton } from '@klotti/ui';

export const SearchLayout = () => {
  const { back } = useRouter();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton onPress={back} />
      }}>
      <Stack.Screen
        name='index'
        options={{
          headerLeft: () => null,
          title: 'Search'
        }}
      />
      <Stack.Screen
        name='[search]'
        options={{
          animation: 'fade',
          headerLeft: () => '',
          title: 'Search'
        }}
      />
      <Stack.Screen
        name='sub-category'
        options={{
          title: 'Sub Category'
        }}
      />
      <Stack.Screen
        name='product-type'
        options={{
          title: 'Product Type'
        }}
      />
    </Stack>
  );
};

export default SearchLayout;
