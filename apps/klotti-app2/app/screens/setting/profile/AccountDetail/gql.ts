import { gql } from '@apollo/client';

export const USER_DETAIL = gql`
  query User {
    user {
      id
      firstName
      lastName
      email
      gender
      dateOfBirth
      phoneNumber
      addresses {
        id
        ...UserAddressFragment
      }
    }
  }
`;
