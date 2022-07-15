export const MONTHS = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

export const UserAction = {
  UPDATE_EVENT: "UPDATE_EVENT",
  ADD_EVENT: "ADD_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
};

export const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
  INIT: "INIT",
};

export const AUTHORIZATION = "Basic flknzxdsffhsdf";

export const END_POINT = "https://16.ecmascript.pages.academy/big-trip";

export const offerTypes = [
  { name: `taxi`, iconURL: `img/icons/taxi.png`, action: `to` },
  { name: `bus`, iconURL: `img/icons/bus.png`, action: `to` },
  { name: `train`, iconURL: `img/icons/train.png`, action: `to` },
  { name: `ship`, iconURL: `img/icons/ship.png`, action: `to` },
  { name: `drive`, iconURL: `img/icons/drive.png`, action: `to` },
  { name: `flight`, iconURL: `img/icons/flight.png`, action: `to` },
  { name: `check-in`, iconURL: `img/icons/check-in.png`, action: `in` },
  { name: `sightseeing`, iconURL: `img/icons/sightseeing.png`, action: `in` },
  { name: `restaurant`, iconURL: `img/icons/restaurant.png`, action: `in` },
];

export const SortType = {
  Day: "day",
  Event: "event",
  Time: "time",
  Price: "price",
  Offers: "offers",
};
