import { MONTHS, offerTypes, SortType } from "../const.js";
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const upCaseFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const humanizeTime = (date) => {
  return date.toLocaleString(`ru`, {
    hour: `numeric`,
    minute: `numeric`,
  });
};

export const humanizeDateInput = (date) => {
  const formattedDate = date.toLocaleString(`en-GB`, {
    year: `2-digit`,
    month: `numeric`,
    day: `numeric`,
  });
  const formattedTime = date.toLocaleString(`ru`, {
    hour: `numeric`,
    minute: `numeric`,
  });
  return `${formattedDate} ${formattedTime}`;
};

export const humanizeDateSpread = (startDate, finishDate) => {
  finishDate.setSeconds(59);
  startDate.setSeconds(0);
  const spread = finishDate.getTime() - startDate.getTime();
  const spreadDay = Math.trunc(Math.abs(spread) / (1000 * 60 * 60 * 24));
  const spreadHours =
    Math.trunc(Math.abs(spread) / (1000 * 60 * 60)) - spreadDay * 24;
  const spreadMinutes =
    Math.trunc(Math.abs(spread) / (1000 * 60)) -
    spreadDay * 24 * 60 -
    spreadHours * 60;
  return `${spreadDay > 0 ? `${spreadDay}D ` : ``}${
    spreadHours > 0 ? `${spreadHours}H ` : ``
  }${spreadMinutes > 0 ? `${spreadMinutes}M ` : ``}`;
};

export const formatShortDate = (date, isOnlyDay) => {
  const month = isOnlyDay ? `` : MONTHS[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`.trim();
};

export const formatDatePair = (firstDate, secondDate) => {
  const firstShortDate = formatShortDate(firstDate);

  const isOnlyDay = firstDate.getMonth() === secondDate.getMonth();
  const secondShortDate = formatShortDate(secondDate, isOnlyDay);

  return `${firstShortDate}&nbsp;&mdash;&nbsp;${secondShortDate}`;
};

export const getOfferTypeByName = (name) => {
  return offerTypes.find((item) => {
    return name === item.name;
  });
};

const getTimeSpreadFromEvent = (event) => {
  return event.finishDate.getTime() - event.startDate.getTime();
};

export const sort = {
  [SortType.Day]: (events) => events.sort((a, b) => a.firstDate - b.firstDate),
  [SortType.Price]: (events) => events.sort((a, b) => b.price - a.price),
  [SortType.Time]: (events) =>
    events.sort(
      (a, b) => getTimeSpreadFromEvent(b) - getTimeSpreadFromEvent(a)
    ),
};
