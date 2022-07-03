import { renderElement, RenderPosition } from "./render";
import { generateEvent } from "./mock/event";
import RouteInfoView from "./view/route-info-view";
import NavigationMenuView from "./view/navigation-menu-view";
import FilterFormView from "./view/filter-form-view";
import CreationFormView from "./view/creation-form-view";
import RoutePointListView from "./view/route-point-list-view";
import RoutePointView from "./view/route-point-view";
import EditFormView from "./view/edit-form-view";
import SortFormView from "./view/sort-form-view";
import OfferTitleView from "./view/offers-title-view";
import OffersView from "./view/offers-view";
import OfferView from "./view/offer-view";

const EVENT_COUNT = 16;
const events = new Array(EVENT_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const tripMainElement = document.querySelector(".trip-main");
renderElement(
  tripMainElement,
  new RouteInfoView(events).element,
  RenderPosition.AFTERBEGIN
);

const navigationMenuWrapperElement = document.querySelector(
  ".trip-controls__navigation"
);
renderElement(navigationMenuWrapperElement, new NavigationMenuView().element);

const filterFormWrapperElement = document.querySelector(
  ".trip-controls__filters"
);
renderElement(filterFormWrapperElement, new FilterFormView().element);

const tripEventsElement = document.querySelector(".trip-events");
renderElement(tripEventsElement, new SortFormView().element);
renderElement(tripEventsElement, new CreationFormView().element);

const routePointListView = new RoutePointListView();
renderElement(tripEventsElement, routePointListView.element);

events.forEach((event, index) => {
  const routePointView = new RoutePointView(event);
  renderElement(routePointListView.element, routePointView.element);

  if (index == 0) {
    renderElement(routePointListView.element, new EditFormView().element);
  }

  const offers = event.offer.offers.filter((it) => it.checked);
  if (offers.length > 0) {
    const favoriteButtonElement = routePointView.element.querySelector(
      ".event__favorite-btn"
    );
    renderElement(
      favoriteButtonElement,
      new OfferTitleView().element,
      RenderPosition.BEFOREBEGIN
    );

    const offersView = new OffersView();
    renderElement(
      favoriteButtonElement,
      offersView.element,
      RenderPosition.BEFOREBEGIN
    );

    offers.map((offer) => {
      renderElement(offersView.element, new OfferView(offer).element);
    });
  }
});
