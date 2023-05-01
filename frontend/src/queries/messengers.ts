import { gql } from '@apollo/client';

export interface getAllMessengersByUserIdVariables {
  user_id: string;
}

export interface getAllMessengersByUserIdData {
  users_by_pk: {
    phone_numbers: {
      id: string;
      phone_number: string;
      session: string;
      messengers: {
        days_running: string;
        hour_end: string;
        hour_start: string;
        id: string;
        message_group_id_fk: string;
        phone_id_fk: string;
        title: string;
      }[];
    }[];
  };
}

export const GET_ALL_MESSENGERS_BY_USER_ID = gql`
  subscription getAllMessengersByUserId($user_id: String!) {
    users_by_pk(id: $user_id) {
      phone_numbers {
        id
        phone_number
        session
        messengers {
          days_running
          hour_end
          hour_start
          id
          message_group_id_fk
          phone_id_fk
          title
          phones_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;
