import AbstractView from "./abstract-view";

export const createAddButtonTemplate = () => {
  return (
   `<button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
    >
      New event
    </button>`
  );
};

export default class AddButtonView extends AbstractView {
  get template() {
    return createAddButtonTemplate();
  }

  setAddButtonClickHandler = (callback) => {
    this._callback.click = callback;

    this.element.addEventListener("click", this.#addButtonClickHandler);
  };

  #addButtonClickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  };
}
