import ApiService from "./api-service";
import Destinations from "./common/destinations";
import Offers from "./common/offers";
import { AUTHORIZATION, END_POINT } from "./const";
import RouteModel from "./model/route-model";
import RoutePresenter from "./presenter/route";

const api = new ApiService(END_POINT, AUTHORIZATION);
const routeModel = new RouteModel(api);

Destinations.getInstance();
Offers.getInstance();

const routePresenter = new RoutePresenter(routeModel);
routePresenter.init();
