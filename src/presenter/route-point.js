import { render, replace, RenderPosition } from "../render";
import OfferPresenter from "./offer";
import OffersView from "../view/offers-view";
import OfferTitleView from "../view/offers-title-view";
import RoutePointEditView from "../view/route-point-edit-view";
import RoutePointView from "../view/route-point-view";

export default class RoutePointPresenter {
  #routePoint = null;
  #routePointEdit = null;
  #offerTitleView = new OfferTitleView();
  #offersView = new OffersView();

  #routePointListContainer = null;

  #event = null;
  #offers = [];

  constructor(container) {
    this.#routePointListContainer = container;
  }

  init = (event) => {
    this.#event = event;

    this.#routePoint = new RoutePointView(event);
    this.#routePointEdit = new RoutePointEditView(event);

    this.#renderRoutePoint(event);

    this.#handleRouteRollupClick();
    this.#handleRouteEditRollupClick();

    this.#renderOffers(event);
  };

  #renderOffers = (event) => {
    const filteredOffers = event.offer.offers.filter((it) => it.checked);
    if (filteredOffers.length > 0) {
      const favoriteButtonElement =
        this.#routePoint.element.querySelector(`.event__favorite-btn`);

      this.#renderOffersTitle(favoriteButtonElement);
      this.#renderOffersView(favoriteButtonElement);

      this.#offers = filteredOffers.map((offer) => {
        const offerPresenter = new OfferPresenter(this.#offersView);
        offerPresenter.init(offer);
        return offerPresenter;
      });
    }
  };

  #renderOffersTitle = (container) => {
    render(container, this.#offerTitleView, RenderPosition.BEFOREBEGIN);
  };

  #renderOffersView = (container) => {
    render(container, this.#offersView, RenderPosition.BEFOREBEGIN);
  };

  #renderRoutePoint = (event) => {
    render(this.#routePointListContainer, this.#routePoint);
  };

  #handleRouteEditRollupClick = () => {
    this.#routePointEdit.setRollupClickHandler(() => {
      replace(this.#routePoint, this.#routePointEdit);
    });
  };

  #handleRouteRollupClick = () => {
    this.#routePoint.setRollupClickHandler(() => {
      replace(this.#routePointEdit, this.#routePoint);
    });
  };
}
