import crypto from "crypto";
import * as bcrypt from "bcrypt"

function encryptPassword(password: string, email: string) {
  const hmac = crypto.createHmac('sha512', email);
  hmac.update(password);
  const token = hmac.digest("hex");
  return token;
}

function encryptPasswordBcrypt(password: string) {
  return bcrypt.hashSync(password, 10);
}

function compareBcryptPasswords(password: string, token: string) {
  return bcrypt.compareSync(password, token);
}

export { encryptPassword, compareBcryptPasswords, encryptPasswordBcrypt };
