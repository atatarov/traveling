import { render, replace, RenderPosition } from "./render";
import { generateEvent } from "./mock/event";
import RoutePointView from "./view/route-point-view";
import OfferTitleView from "./view/offers-title-view";
import OffersView from "./view/offers-view";
import OfferView from "./view/offer-view";
import RoutePointEditView from "./view/route-point-edit-view";
import RoutePresenter from "./presenter/route";

const EVENT_COUNT = 16;
const events = new Array(EVENT_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const routePresenter = new RoutePresenter();
routePresenter.init(events);
