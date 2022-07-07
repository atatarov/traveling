import { getOfferTypeByName, offerTypes } from "../mock/event";
import { offersByType } from "../mock/offers";
import { upCaseFirst } from "../utils/utils";
import SmartView from "./smart-view";

const BLANK_EVENT = {
  eventType: `taxi`,
  offers: [],
  finishDate: new Date(),
  startDate: new Date(),
  price: 0,
  place: {},
  isFavorite: false,
  newEvent: true,
};

const eventTypesTitles = {
  taxi: "Taxi",
  bus: "Bus",
  train: "Train",
  ship: "Ship",
  drive: "Drive",
  flight: "Flight",
  "check-in": "Check-in",
  sightseeing: 'Sightseeing',
  restaurant: 'Restaurant'
};

const createEventTypeItemTemplate = (type, checked) => {
  return (
   `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value=${type}
        ${checked ? `checked` : ``}
      />
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${eventTypesTitles[type]}
      </label>
    </div>`
  );
};

const createEventTypesTemplate = (offerTypes, selectedType) => {
  return (
   `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${offerTypes.map((offerType) => {
        const isChecked = offerType.name === selectedType
        return createEventTypeItemTemplate(offerType.name, isChecked);
      }).join(``)}
    </fieldset>`
  );
};

const createAvailableOfferTemplate = ({ id, title, price, checked }) => {
  return (
   `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${id}"
        type="checkbox"
        name="event-offer-${id}"
        ${checked ? `checked` : ``}
      />
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createAvailableOffersTemplate = (offers) => {
  return (
   `<div class="event__available-offers">
      ${offers.map((offer) => {
        return createAvailableOfferTemplate(offer);
      }).join(``)}
    </div>`
  );
};

const createEventFieldDestinationTemplate = (type, destination) => {
  return (
   `<div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${destination}"
        list="destination-list-1"
      />
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>`
  );
};

const createEventFieldTimeTemplate = () => {
  return (
   `<div class="event__field-group event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input
        class="event__input event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value="18/03/19 12:25"
      />
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input
        class="event__input event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time"
        value="18/03/19 13:35"
      />
    </div>`
  );
};

const createEventFieldPriceTemplate = (price) => {
  return (
   `<div class="event__field-group event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input event__input--price"
        id="event-price-1"
        type="text"
        name="event-price"
        value=${price}
      />
    </div>`
  );
};

export const createPhotosTemplate = (photos) => {
  return (
   `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((photo) => {
          return (
            `<img
              class="event__photo"
              src=${photo.src}
              alt="Event photo"
            />`
          );
        })}
      </div>
    </div>`
  );
};

export const createRoutePointEditTemplate = ({ price, offerType, place, offer }) => {
  const type = `${upCaseFirst(offerType.name)}`
  const destination = `${upCaseFirst(place.name)}`
  const description = place.description;

  return (
   `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label
              class="event__type event__type-btn"
              for="event-type-toggle-1"
            >
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${offerType.name}.png"
                alt="Event type icon"
              />
            </label>
            <input
              class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            />

            <div class="event__type-list">
              ${createEventTypesTemplate(offerTypes, offerType.name)}
            </div>
          </div>
          ${createEventFieldDestinationTemplate(type, destination)}
          ${createEventFieldTimeTemplate()}
          ${createEventFieldPriceTemplate(price)}
          <button class="event__save-btn btn btn--blue" type="submit">
            Save
          </button>
          <button class="event__reset-btn" type="reset">
            Delete
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">
              Offers
            </h3>
            ${createAvailableOffersTemplate(offer.offers)}
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">
              Destination
            </h3>
            <p class="event__destination-description">
            ${description}
            </p>
            ${createPhotosTemplate(place.photos)}
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class RoutePointEditView extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();

    this._state = RoutePointEditView.parseEventToState(event);
    this.#setInnerHandlers();
  }

  get template() {
    return createRoutePointEditTemplate(this._state);
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#rollupClickHandler);
  };

  setSaveButtonClickHandler = (callback) => {
    this._callback.saveClick = callback;

    this.element
      .querySelector("form")
      .addEventListener("submit", this.#saveButtonHandler);
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.deleteClick = callback;

    this.element
      .querySelector(".event__reset-btn")
      .addEventListener("click", this.#deleteButtonHandler);
  };

  #rollupClickHandler = (event) => {
    event.preventDefault();
    this._callback.rollupClick();
  };

  #saveButtonHandler = (event) => {
    event.preventDefault();
    this._callback.saveClick(RoutePointEditView.parseStateToEvent(this._state));
  };

  #deleteButtonHandler = (event) => {
    event.preventDefault();
    this._callback.deleteClick(
      RoutePointEditView.parseStateToEvent(this._state)
    );
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector(".event__type-group")
      .addEventListener("input", this.#typeInputHandler);
  };

  #typeInputHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.updateData({
      offerType: getOfferTypeByName(value),
      offer: offersByType[value],
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setSaveButtonClickHandler(this._callback.saveClick);
    this.setDeleteButtonClickHandler(this._callback.deleteClick)
  };

  static parseEventToState = (event) => {
    return { ...event };
  };

  static parseStateToEvent = (state) => {
    const offerType = { ...state.offerType };
    const event = { ...state, offerType };

    return event;
  };

  reset = (event) => {
    this.updateData(RoutePointEditView.parseEventToState(event));
  };
}
