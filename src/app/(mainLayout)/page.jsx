'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/Card';
import { apiClient } from '../../utils/apiClient';
import Link from 'next/link';
import { useGlobalContext } from '../../context/GlobalContext';
import { discountedPrice, paiseToRupee } from '../../utils/calculation';
import { ShoppingCart } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useGlobalContext();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div className="px-5">
          <h3 className="text-2xl font-semibold">Shop By Category</h3>
          <div className="flex py-4 overflow-x-auto gap-4">
            {categories.map((category) => (
              <div
                className="min-w-52 max-w-52 bg-white rounded-lg shadow-md overflow-hidden"
                key={category.id}
              >
                {/* Product Image */}
                <div className="flex justify-center items-center">
                  <img
                    src={category.image}
                    alt="Product Image"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="font-medium text-gray-800"
                    title={category.name}
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {categories.map((cat, index) => (
          <>
            {cat.products && (
              <>
                {cat.products.length > 0 && (
                  <div className="px-5">
                    <h3 className="mt-5 mb-2 font-medium text-2xl">
                      {cat.name}
                    </h3>
                    <div className="flex py-4 overflow-x-auto gap-4">
                      {cat.products.map((product) => (
                        <div
                          className="min-w-64 max-w-64 bg-white rounded-lg shadow-md overflow-hidden"
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
                          <div className="p-4">
                            <Link
                              href={`/products/${product.slug}`}
                              className="line-clamp-2 text-sm font-medium text-gray-800"
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
                                  discountedPrice(
                                    product.price,
                                    product.discount
                                  )
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
                  </div>
                )}
              </>
            )}
          </>
        ))}
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
