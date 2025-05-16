'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../../utils/apiClient';
import ProductCard from '../../../../components/Card';

const CategoryProductsPage = () => {
  const { cat_slug } = useParams();

  const [products, setProducts] = useState([]);

  const fetchCategoryProducts = async (cat_slug) => {
    try {
      const data = await apiClient.getCategoryProductsBySlug(cat_slug);

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
    fetchCategoryProducts(cat_slug);
  }, [cat_slug]);

  return (
    <div className="container mx-auto p-4">
      {products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
