import Adapter from "../utils/adapter";
import ApiService from "../api-service";
import { AUTHORIZATION, END_POINT } from "../const";

export default class Offers {
  #offers = new Map();

  constructor(api) {
    this.#init(api);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Offers(new ApiService(END_POINT, AUTHORIZATION));
    }
    return this.instance;
  }

  #init = async (api) => {
    try {
      const offers = await api.offers;
      offers.forEach((offer) => {
        this.#offers.set(offer.type, offer.offers);
      });
    } catch (error) {
      this.#offers = new Map();
    }
  };

  getOffersByType = (type) => {
    return this.#offers.get(type);
  };
}
