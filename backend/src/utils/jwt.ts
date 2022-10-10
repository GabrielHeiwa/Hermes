import jwt from "jsonwebtoken";

function generateTokensJwt(payload: string | Object | Buffer) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
  };
}

function updateRefreshToken(payload: string | Object | Buffer) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return accessToken;
}

function updateAccessToken(payload: string | Object | Buffer) {
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return refreshToken;
}

export { updateAccessToken, generateTokensJwt, updateRefreshToken };
