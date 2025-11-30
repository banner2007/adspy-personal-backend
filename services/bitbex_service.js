import axios from "axios";
import CryptoJS from "crypto-js";
import { config } from "../config/env.js";

const BASE_URL = "https://www.bitbex.net";

export class BitbexService {

  sign(query) {
    return CryptoJS.HmacSHA256(query, config.bitbexSecretKey).toString();
  }

  async getAccount() {
    const timestamp = Date.now();
    const params = `apiKey=${config.bitbexApiKey}&timestamp=${timestamp}`;
    const signature = this.sign(params);

    const res = await axios.get(
      `${BASE_URL}/api/account?${params}&signature=${signature}`
    );

    return res.data;
  }

  async getPrice(symbol) {
    const res = await axios.get(`${BASE_URL}/api/market/ticker?symbol=${symbol}`);
    return res.data;
  }
}
