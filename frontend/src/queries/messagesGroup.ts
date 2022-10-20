import { gql } from '@apollo/client';

export interface InsertMesagesGroupVariables {
  messagesGroup: {
    id: string;
    title: string;
    messages: { data: { id: string; message: string }[] };
  };
}

export interface insertMessagesGroupData {
  affected_rows: number;
}

export const INSERT_MESSAGES_GROUP = gql`
  mutation insertMessagesGroup($messagesGroup: [messages_groups_insert_input!] = {}) {
    insert_messages_groups(objects: $messagesGroup) {
      affected_rows
    }
  }
`;

export interface GetMessagesGroupVariables {
  userId: string;
}

export interface GetMessagesGroupData {
  messages_groups: {
    id: string;
    title: string;
    messages: { id: string; message: string }[];
  }[];
}

export const GET_MESSAGES_GROUP = gql`
  query getMessagesGroupByUserId($userId: String!) {
    messages_groups(where: { user_id_fk: { _eq: $userId } }) {
      id
      title
      messages {
        id
        message
      }
    }
  }
`;
