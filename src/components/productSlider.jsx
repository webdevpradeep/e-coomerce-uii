import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';
import { discountedPrice, paiseToRupee } from '../utils/calculation';
const ProductSlider = ({ products }) => {
  return (
    <Swiper
      slidesPerView={1}
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
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      modules={[Autoplay, Scrollbar]}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="bg-white rounded-xl shadow overflow-hidden">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
