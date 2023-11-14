import { Gender } from '@app/__graphql__/generated';
import { string, date, object } from 'yup';

const today = new Date();

export const EditAccountDetailFormSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  phoneNumber: string().required('Required'),
  dateOfBirth: date()
    .required('Required')
    .max(today, 'Must be less than today'),
  gender: string().required('Required').oneOf([Gender.Male, Gender.Female])
});
