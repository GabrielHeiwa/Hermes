import { createHmac } from "node:crypto";

function encryptPassword(payload: string) {
  const token = createHmac("sha256", payload);
  return token.digest("base64");
}

export { encryptPassword };
