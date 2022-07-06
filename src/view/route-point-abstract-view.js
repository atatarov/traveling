import AbstractView from "./abstract-view";

export default class RoutePointAbstractView extends AbstractView {
  _event = null;

  constructor(event) {
    super();

    this._event = event;
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#rollupClickHandler);
  };

  #rollupClickHandler = (event) => {
    event.preventDefault();
    this._callback.rollupClick();
  };
}
