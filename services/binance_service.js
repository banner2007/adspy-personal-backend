import axios from "axios";
import CryptoJS from "crypto-js";
import { config } from "../config/env.js";

const BASE_URL = "https://api.binance.com";

export class BinanceService {

  sign(query) {
    return CryptoJS.HmacSHA256(query, config.binanceSecretKey).toString();
  }

  async getServerTime() {
    const res = await axios.get(`${BASE_URL}/api/v3/time`);
    return res.data;
  }

  async getAccount() {
    const timestamp = Date.now();
    const query = `timestamp=${timestamp}`;
    const signature = this.sign(query);

    const res = await axios.get(
      `${BASE_URL}/api/v3/account?${query}&signature=${signature}`,
      { headers: { "X-MBX-APIKEY": config.binanceApiKey } }
    );

    return res.data;
  }

  async getPrice(symbol) {
    const res = await axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`);
    return res.data;
  }
}
