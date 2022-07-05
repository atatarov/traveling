import {
  formatShortDate,
  upCaseFirst,
  humanizeTime,
  humanizeDateSpread,
} from "../utils/utils";

import RoutePointAbstractView from "./route-point-abstract-view";

export const createRoutePointTemplate = ({
  offerType,
  place,
  startDate,
  finishDate,
  price,
  isFavorite,
}) => {
  const shortDate = formatShortDate(startDate);
  const eventTitle = `${upCaseFirst(offerType.name)} ${offerType.action} ${
    place.name
  }`;

  return (
   `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">
          ${shortDate}
        </time>
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src=${offerType.iconURL}
            alt="Event type icon"
          />
        </div>
        <h3 class="event__title">${eventTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">
              ${humanizeTime(startDate)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">
              ${humanizeTime(finishDate)}
            </time>
          </p>
          <p class="event__duration">
            ${humanizeDateSpread(startDate, finishDate)}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <button
          class="event__favorite-btn ${
          isFavorite ? `event__favorite-btn--active` : ``
        }"
          type="button"
        >
          <span class="visually-hidden">Add to favorite</span>
          <svg
            class="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class RoutePointView extends RoutePointAbstractView {
  get template() {
    return createRoutePointTemplate(this._event);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector(".event__favorite-btn")
      .addEventListener("click", this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favoriteClick();
  };
}
