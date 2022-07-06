import { generateEvent } from "./mock/event";
import RouteModel from "./model/route-model";
import RoutePresenter from "./presenter/route";

const EVENT_COUNT = 16;
const events = new Array(EVENT_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const routeModel = new RouteModel();
routeModel.events = events;

const routePresenter = new RoutePresenter(routeModel);
routePresenter.init();
