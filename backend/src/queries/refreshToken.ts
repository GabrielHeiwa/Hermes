import gql from "graphql-tag";

export const INSERT_REFRESH_TOKEN = gql`
	mutation insertRefreshToken(
		$refreshToken: refresh_tokens_insert_input!
	) {
		insert_refresh_tokens_one(object: $refreshToken) {
			id
			refresh_token
			user_id
		}
	}
`;
