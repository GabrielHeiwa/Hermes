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
