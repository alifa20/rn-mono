import { string, object } from 'yup';

export const AddNewCardFormSchema = object().shape({
  cardNumber: string().required('Required'),
  cardHolderName: string().required('Required'),
  phoneNumber: string().required('Required')
});
