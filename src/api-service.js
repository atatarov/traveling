const Method = {
  GET: "GET",
  PUT: "PUT",
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get events() {
    return this.#load({ url: "points" }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this.#load({ url: "destinations" }).then(ApiService.parseResponse);
  }

  get offers() {
    return this.#load({ url: "offers" }).then(ApiService.parseResponse);
  }

  updateEvent = async (event) => {
    const response = await this.#load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append("Authorization", this.#authorization);

    const response = await fetch(`${this.#endPoint}/${url}`, {
      method,
      body,
      headers,
    });

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (error) {
      ApiService.catch(error);
    }
  };

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  static catch = (error) => {
    throw error;
  };
}
