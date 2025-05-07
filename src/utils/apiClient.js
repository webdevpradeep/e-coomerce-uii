export const baseURL = 'https://api.store.inflection.org.in';

// ----------- User Authentication -------------

export const login = async (payload) => {
  return await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

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
