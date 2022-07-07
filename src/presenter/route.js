import { remove, render, RenderPosition } from "../render";
import { UpdateType, UserAction } from "../const";
import CreationFormView from "../view/creation-form-view";
import FilterFormView from "../view/filter-form-view";
import NavigationMenuView from "../view/navigation-menu-view";
import RoutePointListView from "../view/route-point-list-view";
import SortFormView from "../view/sort-form-view";
import RoutePointPresenter from "./route-point";
import RouteInfoPresenter from "./route-info";
import AddButtonView from "../view/add-button-view";

export default class RoutePresenter {
  #routeModel = null;
  #navigationMenuView = new NavigationMenuView();
  #filterFormView = new FilterFormView();
  #sortFormView = new SortFormView();
  #creationFormView = new CreationFormView();
  #routePointListView = new RoutePointListView();
  #addButtonView = new AddButtonView();

  #routePointPresenters = new Map();
  #routeInfoPresenter = null;

  constructor(model) {
    this.#routeModel = model;

    this.#routeModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    return this.#routeModel.events;
  }

  init = () => {
    this.#routeInfoPresenter = new RouteInfoPresenter();

    this.#renderNavigationMenu();
    this.#renderFilterForm();
    this.#renderSortForm();
    this.#renderAddButton();
    this.#renderRoutePointList();
    this.#handleNewEventClick();
    this.#routeModel.init();
  };

  #handleNewEventClick = () => {
    this.#addButtonView.setAddButtonClickHandler(() => {
      this.#resetActivesForms();
      this.#renderCreationForm();
    });
  };

  #renderRouteContent() {
    this.#renderRouteInfo();
    this.#renderRoutePoints();
  }

  #renderRouteInfo = () => {
    this.#routeInfoPresenter.init(this.events);
  };

  #renderRoutePoints = () => {
    this.events.forEach((event) => {
      const routePointPresenter = new RoutePointPresenter(
        this.#routePointListView,
        this.#handleViewAction,
        this.#handleModeChange
      );
      routePointPresenter.init(event);
      this.#routePointPresenters.set(event.id, routePointPresenter);
    });
  };

  #clearRouteInfo = () => {
    this.#routeInfoPresenter.destroy();
  };

  #clearRoutePoints = () => {
    this.#routePointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#routePointPresenters = new Map();
  };

  #updateRoute = () => {
    this.#updateRouteInfo();
    this.#updateRoutePoints();
  };

  #updateRouteInfo = () => {
    this.#clearRouteInfo();
    this.#renderRouteInfo();
  };

  #updateRoutePoints = () => {
    this.#clearRoutePoints();
    this.#renderRoutePoints();
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

  #renderAddButton = () => {
    const tripMainElement = document.querySelector(".trip-main");
    render(tripMainElement, this.#addButtonView);
  };

  #renderCreationForm = () => {
    render(
      this.#routePointListView,
      this.#creationFormView,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderRoutePointList = () => {
    const tripEventsElement = document.querySelector(".trip-events");
    render(tripEventsElement, this.#routePointListView);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#routeModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#routeModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#routeModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#routePointPresenters.get(data.id).init(data);
        this.#updateRouteInfo();
        break;
      case UpdateType.MINOR:
        this.#updateRoute();
        break;
      case UpdateType.MAJOR:
        break;
      case UpdateType.INIT:
        this.#renderRouteContent();
    }
  };

  #handleModeChange = () => {
    this.#resetActivesForms();
  };

  #resetActivesForms = () => {
    this.#closeCreationForm();
    this.#routePointPresenters.forEach((presenter) => presenter.resetView());
  };

  #closeCreationForm = () => {
    remove(this.#creationFormView);
  };
}
