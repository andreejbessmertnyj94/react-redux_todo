// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export const localStorageKey = 'auth_token';

export function logout() {
  localStorage.removeItem(localStorageKey);
}

export async function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await window.fetch(endpoint, config);
    console.log(response);
    if (response.status === 401) {
      logout();
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return Promise.reject(data.message);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'PATCH', body });
};

client.delete = function (endpoint, body = {}, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE', body });
};
