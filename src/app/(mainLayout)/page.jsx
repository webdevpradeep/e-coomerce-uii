'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/Card';
import { apiClient } from '../../utils/apiClient';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getProfile = async () => {
    try {
      const data = await apiClient.fetchMyProfile();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await apiClient.getProducts();

      if (data.error) {
        alert(data.message);
        return;
      }
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <button onClick={getProfile}>Get My Profile</button>
    </div>
  );
};

export default HomePage;
