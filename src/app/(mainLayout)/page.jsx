'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/Card';
import { apiClient } from '../../utils/apiClient';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getProducts();

      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }
      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await apiClient.fetchCategories();

      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }
      console.log(data);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Categories</h3>
          <ul className="list-disc">
            {categories.map((category) => (
              <li key={category.id} className="text-lg">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center bg-white fixed inset-0 z-10 h-screen w-full">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
