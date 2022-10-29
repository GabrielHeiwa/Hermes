import * as bcrypt from "bcrypt";

function encryptPasswordBcrypt(password: string) {
	return bcrypt.hashSync(password, 10);
}

function compareBcryptPasswords(password: string, token: string) {
	return bcrypt.compareSync(password, token);
}

export { compareBcryptPasswords, encryptPasswordBcrypt };
