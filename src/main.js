import { generateEvent } from "./mock/event"
import RoutePresenter from "./presenter/route";

const EVENT_COUNT = 16;
const events = new Array(EVENT_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const routePresenter = new RoutePresenter();
routePresenter.init(events);
