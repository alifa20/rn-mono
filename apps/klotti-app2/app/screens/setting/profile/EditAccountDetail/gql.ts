import { gql } from '@apollo/client';

export const UPDATE_USER_DETAIL = gql`
  mutation UpdateUser($input: UserInput) {
    updateUser(input: $input) {
      id
    }
  }
`;
