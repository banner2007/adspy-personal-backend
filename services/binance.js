import axios from "axios";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const BASE = "https://api.binance.com";

function sign(queryString) {
  return CryptoJS.HmacSHA256(queryString, process.env.BINANCE_SECRET).toString(
    CryptoJS.enc.Hex
  );
}

export async function publicRequest(path) {
  const url = `${BASE}${path}`;
  const { data } = await axios.get(url);
  return data;
}

export async function signedRequest(path, params = {}) {
  const timestamp = Date.now();
  const query = new URLSearchParams({ ...params, timestamp }).toString();

  const signature = sign(query);

  const url = `${BASE}${path}?${query}&signature=${signature}`;

  const { data } = await axios.get(url, {
    headers: { "X-MBX-APIKEY": process.env.BINANCE_KEY }
  });

  return data;
}

export async function signedPost(path, params = {}) {
  const timestamp = Date.now();
  const query = new URLSearchParams({ ...params, timestamp }).toString();

  const signature = sign(query);

  const url = `${BASE}${path}?${query}&signature=${signature}`;

  const { data } = await axios.post(url, null, {
    headers: { "X-MBX-APIKEY": process.env.BINANCE_KEY }
  });

  return data;
}
