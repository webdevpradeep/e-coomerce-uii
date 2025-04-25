export const baseURL = 'https://api.store.inflection.org.in';

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
