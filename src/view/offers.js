import { createOfferTemplate } from "./offer";

export const createOffersTemplate = (offers) => {
  return (
    `<ul class="event__selected-offers">
      ${offers
        .filter((it) => it.checked)
        .map((offer) => {
          return createOfferTemplate(offer);
        })
        .join(`\n`)}
    </ul>`
  );
};
