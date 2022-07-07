import Adapter from "../utils/adapter";
import ApiService from "../api-service";
import { AUTHORIZATION, END_POINT } from "../const";

export default class Destinations {
  #destinations = new Map();

  constructor(api) {
    this.#init(api);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Destinations(
        new ApiService(END_POINT, AUTHORIZATION)
      );
    }
    return this.instance;
  }

  #init = async (api) => {
    try {
      const destinations = await api.destinations;
      destinations.forEach((destination) => {
        const item = Adapter.adaptDestinationToClient(destination);
        this.#destinations.set(item.name, item);
      });
    } catch (error) {
      this.#destinations = new Map();
    }
  };

  getDestinationByName = (name) => {
    return this.#destinations.get(name);
  };
}
