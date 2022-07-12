import { UpdateType, UserAction } from "../const";
import { remove, render, RenderPosition } from "../render";
import RoutePointEditView from "../view/route-point-edit-view";

export default class RoutePointNewPresenter {
  #routePointEdit = null;
  #routePointListContainer = null;
  #changeData = null;

  constructor(container, changeData) {
    this.#routePointListContainer = container;
    this.#changeData = changeData;
  }

  init = () => {
    this.#routePointEdit = new RoutePointEditView();

    this.#handleSaveClick();
    this.#handleCancelClick();

    this.#renderRoutePointEdit();
  };

  destroy = () => {
    remove(this.#routePointEdit);
    this.#routePointEdit = null;
  };

  #renderRoutePointEdit = () => {
    render(
      this.#routePointListContainer,
      this.#routePointEdit,
      RenderPosition.AFTERBEGIN
    );
  };

  #handleSaveClick = () => {
    this.#routePointEdit.setSaveButtonClickHandler((data) => {
      this.#changeData(UserAction.ADD_EVENT, UpdateType.MINOR, data);
      this.destroy();
    });
  };

  #handleCancelClick = () => {
    this.#routePointEdit.setDeleteButtonClickHandler(() => {
      this.destroy();
    });
  };
}
