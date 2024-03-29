export const BASE_URL = 'https://api.movies-explorer.nomoredomains.work';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password }),
  })
    .then((res) => getResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

export const getUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: `GET`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res))
    .then((data) => data);
};
