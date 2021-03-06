import Destinations from "../common/destinations"
import Offers from "../common/offers";
import { offerTypes } from "../const";
import { getOfferTypeByName, humanizeDateInput, upCaseFirst } from "../utils/utils";
import SmartView from "./smart-view";
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  offerType: getOfferTypeByName("taxi"),
  offer: {
    type: "taxi",
    offers: [],
  },
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
   `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers
          .map((offer) => {
            return createAvailableOfferTemplate(offer);
          })
          .join(``)}
      </div>
    </section>`
  );
};

const createEventFieldDestinationTemplate = (type, destination) => {
  const validationPattern = Destinations.getInstance().getValidationPattern();
  const destinationOptions =
    Destinations.getInstance().getDestinationsOptionsTemplate();

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
        required
        pattern="${validationPattern}"
      />
      <datalist id="destination-list-1">${destinationOptions}</datalist>
    </div>`
  );
};

const createEventFieldTimeTemplate = (startDate, finishDate) => {
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
        value="${humanizeDateInput(startDate)}"
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
        value="${humanizeDateInput(finishDate)}"
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
        type="number"
        name="event-price"
        value=${price}
        required
        min="1"
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
        }).join('')}
      </div>
    </div>`
  );
};

export const createRollupButtonTempalte = () => {
  return (
   `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
};

export const createRoutePointEditTemplate = ({
  price,
  offerType,
  place,
  offer,
  newEvent,
  startDate,
  finishDate,
}) => {
  const type = `${upCaseFirst(offerType.name)}`;
  const destination = `${upCaseFirst(place.name)}`;
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
          ${createEventFieldTimeTemplate(startDate, finishDate)}
          ${createEventFieldPriceTemplate(price)}
          <button class="event__save-btn btn btn--blue" type="submit">
            Save
          </button>
          <button class="event__reset-btn" type="reset">
            ${newEvent ? `Cancel` : `Delete`}
          </button>
          ${newEvent ? `` : createRollupButtonTempalte()}
        </header>
        <section class="event__details">
          ${offer.offers.length > 0
            ? createAvailableOffersTemplate(offer.offers)
            : ``}
          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">
              Destination
            </h3>
            <p class="event__destination-description">${description}</p>
            ${createPhotosTemplate(place.photos)}
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class RoutePointEditView extends SmartView {
  #datePickerStart = null;
  #datePickerFinish = null;

  constructor(event = BLANK_EVENT) {
    super();

    if (event.newEvent) {
      event.offer.offers = Offers.getInstance().getOffersByType("taxi");
      const [firstValue] = Destinations.getInstance()
        .getDestinations()
        .values();
      event.place = firstValue;
    }

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
      ?.addEventListener("click", this.#rollupClickHandler);
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

    if (this._state.newEvent) {
      delete this._state.newEvent;
      delete this._state.id;
    }

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

    this.element
      .querySelectorAll(".event__offer-checkbox")
      .forEach((offerCheckbox) => {
        offerCheckbox.addEventListener("input", this.#offerInputHandler);
      });

    this.element
      .querySelector("input[name=event-destination]")
      .addEventListener("change", this.#destinationInputHandler);

    this.element
      .querySelector(".event__input--price")
      .addEventListener("input", this.#priceInputHandler);

    this.#setDatePicker();
  };

  #priceInputHandler = (event) => {
    event.preventDefault();

    if (event.target.validity.valid) {
      this.updateData({ price: Number(event.target.value) }, true);
    }
  };

  #destinationInputHandler = (event) => {
    event.preventDefault();

    if (event.target.validity.valid) {
      this.updateData({
        place: Destinations.getInstance().getDestinationByName(
          event.target.value
        ),
      });
    }
  };

  #typeInputHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const offer = {
      type: value,
      offers: Offers.getInstance().getOffersByType(value),
    };
    this.updateData({
      offerType: getOfferTypeByName(value),
      offer,
    });
  };

  #offerInputHandler = (event) => {
    event.preventDefault();

    const offer = { ...this._state.offer };

    offer.offers.forEach((item) => {
      if (`event-offer-${item.id}` === event.target.id) {
        item.checked = !item.checked;
      }
    });

    this.updateData({ offer });
  };

  #setDatePicker = () => {
    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerFinish) {
      this.#datePickerFinish.destroy();
      this.#datePickerFinish = null;
    }

    this.#datePickerStart = flatpickr(
      this.element.querySelector(`input[name = event-start-time]`),
      {
        dateFormat: `d/m/y H:i`,
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.startDate,
        onChange: ([startDate]) => {
          this.updateData({ startDate });
        },
      }
    );

    this.#datePickerFinish = flatpickr(
      this.element.querySelector(`input[name = event-end-time]`),
      {
        dateFormat: `d/m/y H:i`,
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.finishDate,
        minDate: this._state.startDate,
        onChange: ([finishDate]) => {
          this.updateData({ finishDate });
        },
      }
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerFinish) {
      this.#datePickerFinish.destroy();
      this.#datePickerFinish = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setSaveButtonClickHandler(this._callback.saveClick);
    this.setDeleteButtonClickHandler(this._callback.deleteClick);
  };

  static parseEventToState = (event) => {
    const parsedEvent = JSON.parse(JSON.stringify(event));
    parsedEvent.startDate = new Date(parsedEvent.startDate);
    parsedEvent.finishDate = new Date(parsedEvent.finishDate);

    return parsedEvent;
  };

  static parseStateToEvent = (state) => {
    const parsedState = JSON.parse(JSON.stringify(state));
    parsedState.startDate = new Date(parsedState.startDate);
    parsedState.finishDate = new Date(parsedState.finishDate);

    return parsedState;
  };

  reset = (event) => {
    this.updateData(RoutePointEditView.parseEventToState(event));
  };
}
