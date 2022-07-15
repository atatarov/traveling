import { SortType } from "../const";
import AbstractView from "./abstract-view";
import { upCaseFirst } from "../utils/utils";

const getDisabledSortTypesAttribute = (sortType) => {
  if (sortType === SortType.Event || sortType === SortType.Offers) {
    return `disabled`;
  }
  return ``;
};

const getSortTypeName = (sortType) => {

}

export const createSortFormTemplate = (currentSortType) => {
  return (
   `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${Object.values(SortType)
        .map((sortType) => {
          return (
           `<div class="trip-sort__item trip-sort__item--${sortType}">
              <input
                id="sort-${sortType}"
                class="trip-sort__input visually-hidden"
                type="radio"
                name="trip-sort"
                value="sort-${sortType}"
                ${currentSortType === sortType ? `checked` : ``}
                ${getDisabledSortTypesAttribute(sortType)}
              />
              <label class="trip-sort__btn" for="sort-${sortType}">
                ${upCaseFirst(sortType)}
              </label>
            </div>`
          );
        })
        .join("")}
    </form>`
  );
};

export default class SortFormView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortFormTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelectorAll("input").forEach((input) => {
      if (!input.disabled) {
        input.addEventListener("input", this.#sortTypeChangeHandler);
      }
    });
  };

  #sortTypeChangeHandler = (event) => {
    event.preventDefault();

    const sortType = event.target.value.replace("sort-", "");
    this._callback.sortTypeChange(sortType);
  };
}
