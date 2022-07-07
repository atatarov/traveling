import ApiService from "./api-service";
import RouteModel from "./model/route-model";
import RoutePresenter from "./presenter/route";

const AUTHORIZATION = "Basic flknzxdsffhsdf";
const END_POINT = "https://16.ecmascript.pages.academy/big-trip";

const routeModel = new RouteModel(new ApiService(END_POINT, AUTHORIZATION));

const routePresenter = new RoutePresenter(routeModel);
routePresenter.init();
