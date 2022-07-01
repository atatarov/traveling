import { getRandomInteger, getRandomDate } from "../utils.js";
import { generatePlace } from "../mock/place.js";

export const offerTypes = [
  { name: `taxi`, iconURL: `img/icons/taxi.png`, action: `to` },
  { name: `bus`, iconURL: `img/icons/bus.png`, action: `to` },
  { name: `train`, iconURL: `img/icons/train.png`, action: `to` },
  { name: `ship`, iconURL: `img/icons/ship.png`, action: `to` },
  { name: `transport`, iconURL: `img/icons/transport.png`, action: `to` },
  { name: `drive`, iconURL: `img/icons/drive.png`, action: `to` },
  { name: `flight`, iconURL: `img/icons/flight.png`, action: `to` },
  { name: `check-in`, iconURL: `img/icons/check-in.png`, action: `in` },
  { name: `sightseeing`, iconURL: `img/icons/sightseeing.png`, action: `in` },
  { name: `restaurant`, iconURL: `img/icons/restaurant.png`, action: `in` },
];

const eventOffers = [
  { id: 1, title: `Add luggage`, price: 30 },
  { id: 2, title: `Switch to comfort class`, price: 100 },
  { id: 3, title: `Add meal`, price: 15 },
  { id: 4, title: `Choose seats`, price: 5 },
  { id: 5, title: `Upgrade to a business class`, price: 40 },
];

const generateOfferType = () => {
  return offerTypes[getRandomInteger(0, offerTypes.length - 1)];
};

const generateOffer = (offerType) => {
  let offers = [];
  if (Math.random() > 0.5) {
    offers = eventOffers
      .filter(() => Math.random() > 0.5)
      .map((it) => {
        it.checked = Math.random() > 0.5;
        return it;
      });
  }
  return {
    offerType,
    offers,
  };
};

export const generateEvent = () => {
  const offerType = generateOfferType();
  const offer = generateOffer(offerType);
  const today = new Date();
  const deadline = new Date();
  deadline.setDate(today.getDate() + 7);
  const startDate = getRandomDate(today, deadline);
  const finishDate = getRandomDate(startDate, new Date());
  return {
    id: new Date() + Math.random(),
    offerType,
    offer,
    place: generatePlace(),
    startDate,
    finishDate,
    price: getRandomInteger(10, 100) * 10,
    isFavorite: Math.random() > 0.5,
  };
};
