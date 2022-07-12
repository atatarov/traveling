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

  updateEvent = async (updateType, update) => {
    const index = this.#events.findIndex((item) => {
      return item.id === update.id;
    });

    if (index === -1) {
      throw new Error("Can't update unexisting event");
    }

    try {
      const response = await this.#apiService.updateEvent(update);

      const updatedEvent = Adapter.adaptEventToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch (error) {
      throw new Error("Can't update event");
    }
  };

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.addEvent(update);
      const newEvent = Adapter.adaptEventToClient(response);

      this.#events = [newEvent, ...this.#events];

      this._notify(updateType, newEvent);
    } catch (error) {
      throw new Error("Can't add event");
    }
  };

  deleteEvent = async (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting event");
    }

    try {
      await this.#apiService.deleteEvent(update);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (error) {
      throw new Error("Can't delete event");
    }
  };
}
