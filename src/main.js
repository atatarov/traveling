import ApiService from "./api-service";
import Destinations from "./common/destinations";
import Offers from "./common/offers";
import { AUTHORIZATION, END_POINT } from "./const";
import RouteModel from "./model/route-model";
import RoutePresenter from "./presenter/route";

const api = new ApiService(END_POINT, AUTHORIZATION);
const routeModel = new RouteModel(api);
const routePresenter = new RoutePresenter(routeModel);

Promise.all([
  Destinations.getInstance().init(api),
  Offers.getInstance().init(api),
]).then(() => {
  routePresenter.init();
});
