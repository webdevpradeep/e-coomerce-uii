'use client';
import { useEffect, useState } from 'react';
// import ProductCard from "../../components/Card";
// import { apiClient } from "../../utils/apiClient";
import Link from 'next/link';
import { useGlobalContext } from '../../context/GlobalContext';
import Carousel from '../../components/Carousel';
import ProductSlider from '../../components/ProductSlider';
import CategorySlider from '../../components/CategorySlider';

const HomePage = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { categories } = useGlobalContext();

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await apiClient.getProducts();

  //     if (data.error) {
  //       alert(data.message);
  //       setLoading(false);
  //       return;
  //     }
  //     console.log(data);
  //     setProducts(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     alert("Something went wrong");
  //   }
  // };

  const images = [
    'https://www.arduinokart.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.ee16cdea.webp&w=3840&q=100',
    'https://www.arduinokart.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.582fea24.png&w=3840&q=100',
    'https://www.arduinokart.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.9686bab0.webp&w=3840&q=100',
  ];

  return (
    <div className="p-5">
      {/* <Carousel slides={images} /> */}

      <CategorySlider categories={categories} />

      <div>
        {categories.map((cat) => (
          <>
            {cat.products && (
              <>
                {cat.products.length > 0 && (
                  <div className="">
                    <h3 className="mt-5 font-medium text-2xl">{cat.name}</h3>
                    <div className="mt-4">
                      <ProductSlider products={cat.products} />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>

      {/* {loading && (
        <div className="flex items-center justify-center bg-white fixed inset-0 z-10 h-screen w-full">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
