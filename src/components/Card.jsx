import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { discountedPrice, paiseToRupee } from '../utils/calculation';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt="Product Image"
          className="w-full h-64 object-cover"
        />
        {/* Discount Tag */}
        <div className="absolute top-0 right-0 bg-red-500 text-white font-semibold py-1 px-3 rounded-bl-lg">
          {product.discount}% OFF
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link
          href={`/products/${product.slug}`}
          className="text-lg font-semibold text-gray-800"
        >
          {product.product_name}
        </Link>
        <p className="text-sm text-gray-600 mt-1">{product.meta_description}</p>

        {/* Price */}
        <div className="mt-3 flex items-center">
          <span className="text-xl font-bold text-gray-900">
            {' '}
            &#8377;
            {paiseToRupee(discountedPrice(product.price, product.discount))}
          </span>
          <span className="text-sm text-gray-500 line-through ml-2">
            &#8377;{paiseToRupee(product.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-300">
          <ShoppingCart size={20} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
