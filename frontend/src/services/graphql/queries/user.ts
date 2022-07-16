import { gql } from "@apollo/client";


export const GET_USER_DATA = gql`
    query getUserData($email: String = "") {
        users (where: { email: { _eq: $email }}) {
            id
            name
            email
        }
    }
`