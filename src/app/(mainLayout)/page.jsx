'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/Card';

import { baseURL } from '../../utils/apiClient';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseURL}/products/public?limit=20&page=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
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
    </div>
  );
};

export default HomePage;
