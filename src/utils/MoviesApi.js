export default class Api {
  constructor(object) {
    this._baseUrl = object.baseUrl;
    this._headers = object.headers;
  }
  _makePromise() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getMovies() {
    return this._makePromise();
  }
}

export const moviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});
