'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';
const CategorySlider = ({ categories }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
      modules={[Autoplay, Scrollbar]}
      className="mySwiper"
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlider;
