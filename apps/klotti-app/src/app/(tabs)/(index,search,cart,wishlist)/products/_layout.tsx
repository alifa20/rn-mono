import { FilterFormData } from '@/src/queries/filters/type';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { BackButton } from '@klotti/ui';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '[title]'
};

export const ProductsLayout = () => {
  const { back } = useRouter();

  const local = useLocalSearchParams();
  const title = local.title as string;

  const methods = useForm<FilterFormData>({
    defaultValues: {
      sortBy: 'RECOMMENDATION',
      categories: [],
      brands: [],
      colors: [],
      subCategories: [],
      sizes: [],
      productTypes: []
    }
  });

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton onPress={back} />
        }}>
        <Stack.Screen
          name='[title]'
          initialParams={local}
          options={{
            headerTitle: title
          }}
        />
        <Stack.Screen
          name='filters'
          options={{
            headerTitle: title,
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name='filterBy'
          options={{
            headerTitle: title
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default ProductsLayout;
