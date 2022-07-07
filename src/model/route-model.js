import { UpdateType } from "../const";
import AbstractObservable from "../utils/abstract-observable";
import Adapter from "../utils/adapter";

export default class RouteModel extends AbstractObservable {
  #events = [];
  #apiService = null;

  constructor(apiService) {
    super();

    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const events = await this.#apiService.events;
      console.log(events)
      this.#events = events.map((event) => Adapter.adaptEventToClient(event));
    } catch (error) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  };

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
