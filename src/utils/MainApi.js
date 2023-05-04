class MainApi {
  constructor(object) {
    this._baseUrl = object.baseUrl;
  }
  _makePromise(url, method, body) {
    return fetch(`${this._baseUrl}${url}`, {
      method: `${method}`,
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getMovies() {
    return this._makePromise(`/movies`, 'GET');
  }

  addMovie(data) {
    return this._makePromise(
      '/movies',
      'POST',
      JSON.stringify({
        country: `${data.country}`,
        director: `${data.director}`,
        duration: `${data.duration}`,
        year: `${data.year}`,
        description: `${data.description}`,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: `${data.trailerLink}`,
        nameRU: `${data.nameRU}`,
        nameEN: `${data.nameEN}`,
        thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
        movieId: `${data.id}`,
      }),
    );
  }

  deleteMovie(movieId) {
    return this._makePromise(`/movies/${movieId}`, 'DELETE');
  }

  updateUser(name, email) {
    return this._makePromise('/users/me', 'PATCH', JSON.stringify({ name, email }));
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.movies-explorer.nomoredomains.work',
});
