import { formatShortDate } from "../utils";

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

export const formatDatePair = (firstDate, secondDate) => {
  const firstShortDate = formatShortDate(firstDate);

  const isOnlyDay = firstDate.getMonth() === secondDate.getMonth();
  const secondShortDate = formatShortDate(secondDate, isOnlyDay);

  return `${firstShortDate}&nbsp;&mdash;&nbsp;${secondShortDate}`;
};

export const createRouteInfoTemplate = (events) => {
  const { places, finishDate, price } = events.reduce(
    (result, event) => {
      if (result.places.last() !== event.place.name) {
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

  const startDate = events.first().startDate;

  const datePair = formatDatePair(startDate, finishDate);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${places.join(` &mdash; `)}</h1>

        <p class="trip-info__dates">${datePair}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};
