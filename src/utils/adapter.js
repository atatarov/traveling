import { getOfferTypeByName } from "../mock/event";

export default class Adapter {
  static adaptEventToClient = (event) => {
    const offerType = getOfferTypeByName(event["type"]);

    const offer = {
      offerType: event["type"],
      offers: event["offers"],
    };

    const place = {
      name: event.destination["name"],
      description: event.destination["description"],
      photos: event.destination["pictures"],
    };

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
    const destination = {
      name: event.place.name,
      description: event.place.description,
      pictures: event.place.photos,
    };

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
}
