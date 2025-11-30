import { BinanceService } from "./binance_service.js";
import { BitbexService } from "./bitbex_service.js";

export class ExchangeManager {
  constructor() {
    this.exchanges = {
      binance: new BinanceService(),
      bitbex: new BitbexService()
    };
  }

  getExchange(name) {
    return this.exchanges[name];
  }

  listExchanges() {
    return Object.keys(this.exchanges);
  }
}
