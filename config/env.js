import dotenv from "dotenv";
dotenv.config();

export const config = {
  binanceApiKey: process.env.BINANCE_API_KEY,
  binanceSecretKey: process.env.BINANCE_SECRET_KEY,
  bitbexApiKey: process.env.BITBEX_API_KEY,
  bitbexSecretKey: process.env.BITBEX_SECRET_KEY
};
