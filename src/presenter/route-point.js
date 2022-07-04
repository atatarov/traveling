import { render, replace, RenderPosition, remove } from "../render";
import OffersView from "../view/offers-view";
import OfferTitleView from "../view/offers-title-view";
import RoutePointEditView from "../view/route-point-edit-view";
import RoutePointView from "../view/route-point-view";
import OfferView from "../view/offer-view";

const Mode = {
  DEFAULT: "DEFAULT",
  EDITING: "EDITING",
};

export default class RoutePointPresenter {
  #routePoint = null;
  #routePointEdit = null;
  #offerTitleView = new OfferTitleView();
  #offersView = new OffersView();

  #routePointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #event = null;
  #offerViewList = [];
  #mode = Mode.DEFAULT;

  constructor(container, changeData, changeMode) {
    this.#routePointListContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event) => {
    this.#event = event;

    const prevRoutePoint = this.#routePoint;
    const prevRoutePointEdit = this.#routePointEdit;

    this.#routePoint = new RoutePointView(event);
    this.#routePointEdit = new RoutePointEditView(event);

    this.#handleRouteRollupClick();
    this.#handleRouteEditRollupClick();
    this.#handleFavoriteClick();

    if (prevRoutePoint === null || prevRoutePointEdit === null) {
      this.#renderRoutePoint(event);
      this.#renderOffers(event);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePoint, prevRoutePoint);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#routePointEdit, prevRoutePointEdit);
    }

    this.#renderOffers(event);
    remove(prevRoutePoint);
    remove(prevRoutePointEdit);
  };

  destroy = () => {
    remove(this.#routePoint);
    remove(this.#routePointEdit);
  };

  #renderOffers = (event) => {
    this.#clearOfferViewList();

    const filteredOffers = event.offer.offers.filter((it) => it.checked);
    if (filteredOffers.length > 0) {
      const favoriteButtonElement =
        this.#routePoint.element.querySelector(`.event__favorite-btn`);

      this.#renderOffersTitle(favoriteButtonElement);
      this.#renderOffersView(favoriteButtonElement);

      filteredOffers.forEach((offer) => {
        const offerView = new OfferView(offer);
        render(this.#offersView, offerView);
        this.#offerViewList.push(offerView);
      });
    }
  };

  #clearOfferViewList = () => {
    this.#offerViewList.forEach((offerView) => {
      remove(offerView);
    });
    this.#offerViewList = [];
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
      this.#replaceEditToDefault();
    });
  };

  #handleRouteRollupClick = () => {
    this.#routePoint.setRollupClickHandler(() => {
      this.#replaceDefaultToEdit();
    });
  };

  #handleFavoriteClick = () => {
    this.#routePoint.setFavoriteClickHandler(() => {
      this.#changeData({ ...this.#event, isFavorite: !this.#event.isFavorite });
    });
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToDefault();
    }
  };

  #replaceEditToDefault = () => {
    replace(this.#routePoint, this.#routePointEdit);
    this.#mode = Mode.DEFAULT;
  };

  #replaceDefaultToEdit = () => {
    replace(this.#routePointEdit, this.#routePoint);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };
}
