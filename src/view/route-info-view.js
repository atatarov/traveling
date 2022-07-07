import { formatDatePair } from "../utils/utils";
import AbstractView from "./abstract-view";

export const createRouteInfoTemplate = (events) => {
  const { places, finishDate, price } = events.reduce(
    (result, event) => {
      if (result.places[result.places.length - 1] !== event.place.name) {
        result.places.push(event.place.name);
      }

      if (event.finishDate > result.finishDate) {
        result.finishDate = event.finishDate;
      }

      result.price +=
        event.price +
        event.offer.offers
          .filter((offer) => offer.checked)
          .reduce((acc, offer) => acc + offer.price, 0);

      return result;
    },
    {
      places: [],
      finishDate: new Date(),
      price: 0,
    }
  );

  const startDate = events[0].startDate;

  const datePair = formatDatePair(startDate, finishDate);

  const tripInfoTitle =
    places.length > 3
      ? `${places[0]} &mdash; ... &mdash; ${places[places.length - 1]}`
      : `${places.join(` &mdash; `)}`;

  return (
   `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>

        <p class="trip-info__dates">${datePair}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class RouteInfoView extends AbstractView {
  #events = null;

  constructor(events) {
    super();

    this.#events = events;
  }

  get template() {
    return createRouteInfoTemplate(this.#events);
  }
}
