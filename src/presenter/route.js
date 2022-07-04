import { render, RenderPosition } from "../render";
import CreationFormView from "../view/creation-form-view";
import FilterFormView from "../view/filter-form-view";
import NavigationMenuView from "../view/navigation-menu-view";
import RouteInfoView from "../view/route-info-view";
import RoutePointListView from "../view/route-point-list-view";
import SortFormView from "../view/sort-form-view";
import RoutePointPresenter from "./route-point";

export default class RoutePresenter {
  #routeInfoView = null;
  #navigationMenuView = new NavigationMenuView();
  #filterFormView = new FilterFormView();
  #sortFormView = new SortFormView();
  #creationFormView = new CreationFormView();
  #routePointListView = new RoutePointListView();

  #events = null;
  #routePoints = [];

  init = (events) => {
    this.#events = events;

    this.#routeInfoView = new RouteInfoView(events);

    this.#renderRouteInfo();
    this.#renderNavigationMenu();
    this.#renderFilterForm();
    this.#renderSortForm();
    this.#renderCreationForm();
    this.#renderRoutePointList();
    this.#renderRoutePoints(events);
  };

  #renderRouteInfo = () => {
    const tripMainElement = document.querySelector(".trip-main");
    render(tripMainElement, this.#routeInfoView, RenderPosition.AFTERBEGIN);
  };

  #renderNavigationMenu = () => {
    const navigationMenuWrapperElement = document.querySelector(
      ".trip-controls__navigation"
    );
    render(navigationMenuWrapperElement, this.#navigationMenuView);
  };

  #renderFilterForm = () => {
    const filterFormWrapperElement = document.querySelector(
      ".trip-controls__filters"
    );
    render(filterFormWrapperElement, this.#filterFormView);
  };

  #renderSortForm = () => {
    const tripEventsElement = document.querySelector(".trip-events");
    render(tripEventsElement, this.#sortFormView);
  };

  #renderCreationForm = () => {
    const tripEventsElement = document.querySelector(".trip-events");
    render(tripEventsElement, this.#creationFormView);
  };

  #renderRoutePointList = () => {
    const tripEventsElement = document.querySelector(".trip-events");
    render(tripEventsElement, this.#routePointListView);
  };

  #renderRoutePoints = (events) => {
    this.#routePoints = events.map((event) => {
      const routePoint = new RoutePointPresenter(this.#routePointListView);
      routePoint.init(event);
      return routePoint;
    });
  };
}
