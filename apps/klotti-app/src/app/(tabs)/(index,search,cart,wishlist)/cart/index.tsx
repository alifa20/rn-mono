import { useCart } from '@/src/queries';
import { Text } from 'react-native';

export const CartScreen = () => {
  const { bagItems } = useCart();
  return bagItems?.map(item => <Text>{item?.product?.id}</Text>);
};

export default CartScreen;
