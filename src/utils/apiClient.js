import { getCookie } from './cookies';

export const baseURL = 'https://api.store.inflection.org.in';

// fetch client is a wrapper around the fetch API that adds default headers and options to the request.
export const fetchClient = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return await fetch(url, config);
};

// authenticated fetch client is a wrapper around the fetch API that adds default headers and options to the request.
// It also adds the authorization token to the request headers.
export const fetchClientAuth = async (url, options = {}) => {
  const token = getCookie('access_token'); // or sessionStorage

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // if (token) {
  //   defaultHeaders["Authorization"] = `Bearer ${token}`;
  // }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return await fetch(url, config);
};

// ----------- User Authentication -------------

export const login = async (payload) => {
  return await fetchClient(`${baseURL}/users/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
// export const login = async (payload) => {
//   return await fetch(`${baseURL}/users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };

export const signup = async (payload) => {
  return await fetch(`${baseURL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const resetPassword = async (payload, token) => {
  return await fetch(`${baseURL}/users/reset_password/${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const forgotPassword = async (payload) => {
  return await fetch(`${baseURL}/users/forgot_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const fetchMyProfile = async () => {
  return await fetchClientAuth(`${baseURL}/users/profiles/my`, {
    method: 'GET',
  });
};

// --------------- Products Fetching ------------

export const getProducts = async (filter = 'limit=20&page=1') => {
  return await fetch(`${baseURL}/products/public?${filter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProductDetails = async (slug) => {
  return await fetch(`${baseURL}/products/public/s/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
