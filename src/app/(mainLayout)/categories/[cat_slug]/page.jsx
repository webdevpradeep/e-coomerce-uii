'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../../utils/apiClient';
import ProductCard from '../../../../components/Card';
import Link from 'next/link';
import { discountedPrice, paiseToRupee } from '../../../../utils/calculation';

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
    <div className="p-4">
      {products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              className="bg-white rounded-xl shadow overflow-hidden"
              key={product.id}
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.thumbnail}
                  alt="Product Image"
                  className="w-full h-48 object-cover"
                />
                {/* Discount Tag */}
                <div className="absolute top-0 right-0 bg-green-500 text-white font-semibold py-1 px-3 rounded-bl-lg">
                  {product.discount}% OFF
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 bg-green-50">
                <Link
                  href={`/products/${product.slug}`}
                  className="line-clamp-1 text-sm font-medium text-gray-800"
                  title={product.product_name}
                >
                  {product.product_name}
                </Link>
                {/* Price */}
                <div className="mt-2 flex items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {' '}
                    &#8377;
                    {paiseToRupee(
                      discountedPrice(product.price, product.discount)
                    )}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    &#8377;{paiseToRupee(product.price)}
                  </span>
                </div>
              </div>
            </div>
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
