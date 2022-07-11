import { getOfferTypeByName } from "./utils";

export default class Adapter {
  static adaptEventToClient = (event) => {
    const offerType = getOfferTypeByName(event["type"]);

    const offer = {
      offerType: event["type"],
      offers: event["offers"],
    };

    const place = this.adaptDestinationToClient(event.destination);

    const adaptedEvent = {
      id: event["id"],
      offerType,
      offer,
      place,
      startDate: new Date(event["date_from"]),
      finishDate: new Date(event["date_to"]),
      price: event["base_price"],
      isFavorite: event["is_favorite"],
    };

    return adaptedEvent;
  };

  static adaptEventToServer = (event) => {
    const destination = Adapter.adaptDestinationToServer(event.place);
    const adaptedEvent = {
      base_price: event["price"],
      date_from: event["startDate"].toISOString(),
      date_to: event["finishDate"].toISOString(),
      id: event["id"],
      is_favorite: event["isFavorite"],
      type: event.offerType.name,
      offers: event.offer.offers,
      destination,
    };

    return adaptedEvent;
  };

  static adaptDestinationToClient = (destination) => {
    return {
      name: destination.name,
      description: destination.description,
      photos: destination.pictures,
    };
  };

  static adaptDestinationToServer = (destination) => {
    return {
      name: destination.name,
      description: destination.description,
      pictures: destination.photos,
    };
  };
}
