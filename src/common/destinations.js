import Adapter from "../utils/adapter";

export default class Destinations {
  #destinations = new Map();
  #validationPattern = new String();
  #destinationOptionsTemplate = new String();

  static getInstance() {
    if (!this.instance) {
      this.instance = new Destinations();
    }
    return this.instance;
  }

  init = async (api) => {
    try {
      const destinations = await api.destinations;
      destinations.forEach((destination) => {
        const item = Adapter.adaptDestinationToClient(destination);
        this.#destinations.set(item.name, item);
      });
      this.#initValidationPattern();
      this.#initDestinationsOptionsTemplate();
    } catch (error) {
      this.#destinations = new Map();
    }
  };

  getDestinationByName = (name) => {
    return this.#destinations.get(name);
  };

  getDestinations = () => {
    return this.#destinations;
  };

  getValidationPattern = () => {
    return this.#validationPattern;
  };

  getDestinationsOptionsTemplate = () => {
    return this.#destinationOptionsTemplate;
  };

  #initValidationPattern = () => {
    const listOfCities = Array.from(this.#destinations.keys()).reduce(
      (result, item) => {
        if (!result) {
          result = String(item).concat("|");
        } else {
          result = result.concat("|").concat(item);
        }
        return result;
      },
      String()
    );
    this.#validationPattern = `^(${listOfCities})$`;
  };

  #initDestinationsOptionsTemplate = () => {
    this.#destinationOptionsTemplate = Array.from(this.#destinations.values())
      .map((item) => {
        return `<option value="${item.name}"></option>`;
      })
      .join("");
  };
}
