import AbstractObservable from "../utils/abstract-observable";

export default class RouteModel extends AbstractObservable {
  #events = [];

  set events(events) {
    this.#events = [...events];
  }

  get events() {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const index = this.#events.findIndex((item) => {
      return item.id === update.id;
    });

    if (index === -1) {
      throw new Error("Can't update unexisting event");
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addEvent = (updateType, update) => {
    this.#events = [update, ...this.#events];

    this._notify(updateType, update);
  };

  deleteEvent = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting task");
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
