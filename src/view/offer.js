export const createOfferTemplate = ({ title, price }) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&nbsp;&euro;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
};
