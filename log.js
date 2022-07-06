diff --git a/src/main.js b/src/main.js
index 4657bc9..70dac82 100644
--- a/src/main.js
+++ b/src/main.js
@@ -1,16 +1,11 @@
 import { render, replace, RenderPosition } from "./render";
 import { generateEvent } from "./mock/event";
-import RouteInfoView from "./view/route-info-view";
-import NavigationMenuView from "./view/navigation-menu-view";
-import FilterFormView from "./view/filter-form-view";
-import CreationFormView from "./view/creation-form-view";
-import RoutePointListView from "./view/route-point-list-view";
 import RoutePointView from "./view/route-point-view";
-import SortFormView from "./view/sort-form-view";
 import OfferTitleView from "./view/offers-title-view";
 import OffersView from "./view/offers-view";
 import OfferView from "./view/offer-view";
 import RoutePointEditView from "./view/route-point-edit-view";
+import RoutePresenter from "./presenter/route";
 
 const EVENT_COUNT = 16;
 const events = new Array(EVENT_COUNT)
@@ -18,68 +13,5 @@ const events = new Array(EVENT_COUNT)
   .map(generateEvent)
   .sort((a, b) => a.startDate - b.startDate);
 
-const tripMainElement = document.querySelector(".trip-main");
-render(
-  tripMainElement,
-  new RouteInfoView(events),
-  RenderPosition.AFTERBEGIN
-);
-
-const navigationMenuWrapperElement = document.querySelector(
-  ".trip-controls__navigation"
-);
-render(navigationMenuWrapperElement, new NavigationMenuView());
-
-const filterFormWrapperElement = document.querySelector(
-  ".trip-controls__filters"
-);
-render(filterFormWrapperElement, new FilterFormView());
-
-const tripEventsElement = document.querySelector(".trip-events");
-render(tripEventsElement, new SortFormView());
-render(tripEventsElement, new CreationFormView());
-
-const routePointListView = new RoutePointListView();
-render(tripEventsElement, routePointListView);
-
-const renderOffers = (container, offers) => {
-  if (offers.length > 0) {
-    const favoriteButtonElement =
-      container.element.querySelector(`.event__favorite-btn`);
-
-    render(
-      favoriteButtonElement,
-      new OfferTitleView(),
-      RenderPosition.BEFOREBEGIN
-    );
-
-    const offersView = new OffersView();
-    render(
-      favoriteButtonElement,
-      offersView,
-      RenderPosition.BEFOREBEGIN
-    );
-
-    offers.map((offer) => {
-      render(offersView, new OfferView(offer));
-    });
-  }
-};
-
-events.forEach((event) => {
-  const routePointView = new RoutePointView(event);
-  render(routePointListView, routePointView);
-
-  const offers = event.offer.offers.filter((it) => it.checked);
-  renderOffers(routePointView, offers);
-
-  const routePointEditView = new RoutePointEditView(event);
-
-  routePointView.setRollupClickHandler(() => {
-    replace(routePointEditView, routePointView);
-  });
-
-  routePointEditView.setRollupClickHandler(() => {
-    replace(routePointView, routePointEditView);
-  });
-});
+const routePresenter = new RoutePresenter();
+routePresenter.init(events);
