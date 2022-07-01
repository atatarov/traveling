import { RenderPosition, renderTemplate } from "./render";
import { createCreationFormTemplate } from "./view/creation-form";
import { createEditFormTemplate } from "./view/edit-form";
import { createFilterFormTemplate } from "./view/filter-form";
import { createNavigationMenuTemplate } from "./view/navigation-menu";
import { createRoutePointTemplate } from "./view/route-point";
import { createRoutePointListTemplate } from "./view/route-point-list";
import { createSortFormTemplate } from "./view/sort-form";
import { createRouteInfoTemplate } from "./view/route-info";
import { generateEvent } from "./mock/event";

const EVENT_COUNT = 16;
const events = new Array(EVENT_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const tripMainElement = document.querySelector(".trip-main");
const routeInfoTemplate = createRouteInfoTemplate(events);
renderTemplate(tripMainElement, routeInfoTemplate, RenderPosition.AFTERBEGIN);

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

events.forEach((event, index) => {
  const routePointTemplate = createRoutePointTemplate(event);
  renderTemplate(routePointListElement, routePointTemplate);
  if (index == 0) {
    const editFormTemplate = createEditFormTemplate();
    renderTemplate(routePointListElement, editFormTemplate);
  }
});
