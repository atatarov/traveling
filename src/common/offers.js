export default class Offers {
  #offers = new Map();

  static getInstance() {
    if (!this.instance) {
      this.instance = new Offers();
    }
    return this.instance;
  }

  init = async (api) => {
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
