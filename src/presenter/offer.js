import { render } from "../render";
import OfferView from "../view/offer-view";

export default class OfferPresenter {
  #container = null;

  #offer = null;
  #offerView = null;

  constructor(container) {
    this.#container = container;
  }

  init = (offer) => {
    this.#offer = offer;

    this.#offerView = new OfferView(offer);
    this.#renderOfferView(offer);
  };

  #renderOfferView = (offer) => {
    render(this.#container, this.#offerView);
  };
}
