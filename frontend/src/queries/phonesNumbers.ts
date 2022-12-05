import { gql } from '@apollo/client';

export interface GetPhonesNumbersByUserIdVariables {
  userId?: string;
}

export interface GetPhonesNumbersByUserIdData {
  phone_numbers: {
    id: string;
    description: string;
    phone_number: string;
  }[];
}

export const GET_PHONES_NUMBERS_BY_USER_ID = gql`
  query getPhonesNumbersByUserId($userId: String!) {
    phone_numbers(where: { user_id_fk: { _eq: $userId } }) {
      id
      description
      phone_number
    }
  }
`;
