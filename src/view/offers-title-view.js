import AbstractView from "./abstract-view";

const createOfferTitleTemplate = () => {
  return `<h4 class="visually-hidden">Offers:</h4>`;
};

export default class OfferTitleView extends AbstractView {
  get template() {
    return createOfferTitleTemplate();
  }
}
