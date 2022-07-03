import AbstractView from "./abstract-view";

export const createOffersTemplate = () => {
  return `<ul class="event__selected-offers"></ul>`;
};

export default class OffersView extends AbstractView {
  get template() {
    return createOffersTemplate();
  }
}
