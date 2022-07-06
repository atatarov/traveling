import AbstractView from "./abstract-view";

export const createOfferTemplate = ({ title, price }) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&nbsp;&euro;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
};

export default class OfferView extends AbstractView {
  #offer = null;

  constructor(offer) {
    super();

    this.#offer = offer;
  }

  get template() {
    return createOfferTemplate(this.#offer);
  }
}
