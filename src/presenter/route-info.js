import { remove, render, RenderPosition } from "../render";
import RouteInfoView from "../view/route-info-view";

export default class RouteInfoPresenter {
  #routeInfoView = null;

  init = (events) => {
    this.#routeInfoView = new RouteInfoView(events);

    this.#renderRouteInfo();
  };

  #renderRouteInfo = () => {
    const tripMainElement = document.querySelector(".trip-main");
    render(tripMainElement, this.#routeInfoView, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    remove(this.#routeInfoView);
  };
}
