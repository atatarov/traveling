import { RenderPosition, renderTemplate } from "./render";
import { createCreationFormTemplate } from "./view/creation-form";
import { createEditFormTemplate } from "./view/edit-form";
import { createFilterFormTemplate } from "./view/filter-form";
import { createNavigationMenuTemplate } from "./view/navigation-menu";
import { createRoutePointTemplate } from "./view/route-point";
import { createRoutePointListTemplate } from "./view/route-point-list";
import { createSortFormTemplate } from "./view/sort-form";
import { createTripInfoTemplate } from "./view/trip-info";

const ROUTES_POINTS = 3;

const tripMainElement = document.querySelector(".trip-main");
const tripInfoTemplate = createTripInfoTemplate();
renderTemplate(tripMainElement, tripInfoTemplate, RenderPosition.AFTERBEGIN);

const navigationMenuWrapperElement = document.querySelector(
  ".trip-controls__navigation"
);
const navigationMenuTemplate = createNavigationMenuTemplate();
renderTemplate(navigationMenuWrapperElement, navigationMenuTemplate);

const filterFormWrapperElement = document.querySelector(
  ".trip-controls__filters"
);
const filterFormMenuTemplate = createFilterFormTemplate();
renderTemplate(filterFormWrapperElement, filterFormMenuTemplate);

const tripEventsElement = document.querySelector(".trip-events");
const sortFormMenuTemplate = createSortFormTemplate();
renderTemplate(tripEventsElement, sortFormMenuTemplate);

const creationFormTemplate = createCreationFormTemplate();
renderTemplate(tripEventsElement, creationFormTemplate);

const routePointListTemplate = createRoutePointListTemplate();
renderTemplate(tripEventsElement, routePointListTemplate);

const routePointListElement =
  tripEventsElement.querySelector(".trip-events__list");
const routePointTemplate = createRoutePointTemplate();

for (let i = 0; i < ROUTES_POINTS; i++) {
  renderTemplate(routePointListElement, routePointTemplate);
  if (i == 0) {
    const editFormTemplate = createEditFormTemplate();
    renderTemplate(routePointListElement, editFormTemplate);
  }
}
