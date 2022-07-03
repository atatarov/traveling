import AbstractView from "./abstract-view";

export const createRoutePointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class RoutePointListView extends AbstractView {
  get template() {
    return createRoutePointListTemplate();
  }
}
