import AbstractView from "./view/abstract-view";

export const RenderPosition = {
  BEFOREBEGIN: "beforebegin",
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  AFTEREND: "afterend",
};

export const render = (
  container,
  element,
  place = RenderPosition.BEFOREEND
) => {
  const parent =
    container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newELement = document.createElement("div");
  newELement.innerHTML = template;

  return newELement.firstChild;
};

export const replace = (newComponent, oldComponent) => {
  if (
    !(
      newComponent instanceof AbstractView &&
      oldComponent instanceof AbstractView
    )
  ) {
    throw new Error("Can replace only components");
  }

  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error("Parent element doesn't exist");
  }

  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error("Can remove only components");
  }

  component.element.remove();
  component.removeElement();
};
