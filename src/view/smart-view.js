import AbstractView from "./abstract-view";

export default class SmartView extends AbstractView {
  _state = {};

  updateData = (update, justDataUpdating = false) => {
    if (!update) {
      return;
    }

    this._state = { ...this._state, ...update };

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  };

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  };

  _restoreHandlers = () => {
    throw new Error("Abstract method not implemented: _restoreHandlers");
  };
}
