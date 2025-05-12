import { getCookie } from './cookies';

export const baseURL = 'https://api.store.inflection.org.in';

export const apiClient = async (url, method, body = null, tokenName = '') => {
  const accessToken = getCookie('access_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (tokenName) {
    defaultHeaders['Authorization'] = `Bearer ${getCookie(tokenName)}`;
  } else {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  let config;

  if (!body || body === null) {
    config = {
      method: method,
      headers: {
        ...defaultHeaders,
      },
    };
  } else {
    config = {
      method: method,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(`${baseURL}${url}`, config);
  return await response.json();
};

// Auth APIs
apiClient.login = (payload) => apiClient('/users/login', 'POST', payload);

// User APIs
apiClient.fetchMyProfile = () => apiClient('/users/profiles/my', 'GET');

// Product APIs
apiClient.getProducts = (filter = '') =>
  apiClient(`/products?${filter}`, 'GET');
