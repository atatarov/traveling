import { nanoid } from "nanoid";
import { getRandomInteger } from "../utils";

export const offersByType = {
  taxi: {
    offerType: "taxi",
    offers: [
      {
        id: nanoid(),
        title: "Upgrade to a business class",
        price: 120,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Choose the radio station",
        price: 30,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "choose temperature",
        price: 60,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Drive quickly, I'm in a hurry",
        price: 120,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Drive slowly",
        price: 110,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  bus: {
    offerType: "bus",
    offers: [
      {
        id: nanoid(),
        title: "Infotainment system",
        price: 75,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Order meal",
        price: 115,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Choose seats",
        price: 150,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  train: {
    offerType: "train",
    offers: [
      {
        id: nanoid(),
        title: "Book a taxi at the arrival point",
        price: 75,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Order a breakfast",
        price: 15,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Wake up at a certain time",
        price: 10,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  ship: {
    offerType: "ship",
    offers: [
      {
        id: nanoid(),
        title: "Upgrade to comfort class",
        price: 70,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Choose seats",
        price: 190,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Upgrade to business class",
        price: 75,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Add luggage",
        price: 30,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Business lounge ",
        price: 40,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  transport: {
    offerType: "transport",
    offers: [],
  },
  drive: {
    offerType: "drive",
    offers: [
      {
        id: nanoid(),
        title: "Rent a car",
        price: 200,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  flight: {
    offerType: "flight",
    offers: [
      {
        id: nanoid(),
        title: "Add luggage",
        price: 50,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Switch to comfort",
        price: 80,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  "check-in": {
    offerType: "check-in",
    offers: [
      {
        id: nanoid(),
        title: "Choose the time of check-in",
        price: 70,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Choose the time of check-out",
        price: 190,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Add breakfast",
        price: 50,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Laundry",
        price: 50,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Order a meal from the restaurant",
        price: 30,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  sightseeing: {
    offerType: "sightseeing",
    offers: [
      {
        id: nanoid(),
        title: "Book tickets",
        price: 40,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Lunch in city",
        price: 30,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  restaurant: {
    offerType: "restaurant",
    offers: [
      {
        id: nanoid(),
        title: "Choose live music ",
        price: 40,
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        id: nanoid(),
        title: "Choose VIP area",
        price: 30,
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
};
