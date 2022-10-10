import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env") });

interface DecodedToken {
  iat?: string;
  exp?: string;
}

const app = express();

app.get("/validate-token", (req, res) => {
  try {
    const access_token =
      req.body?.access_token ||
      req.headers.authorization?.replace("Bearer", "").trim();
    if (!access_token)
      return res
        .status(401)
        .json({ success: false, message: "Nenhum token enviado" });

    const decoded = jwt.verify(access_token, "123") as DecodedToken;
    delete decoded["iat"];
    delete decoded["exp"];

    return res.status(200).json(decoded);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Token server running in: http://localhost:${process.env.PORT}`)
);
