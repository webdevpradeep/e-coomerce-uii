'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../../utils/apiClient';
import { paiseToRupee } from '../../../../utils/calculation';

const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState({});

  const { slug } = useParams();
  const fetchProductDeatils = async (slug) => {
    try {
      const data = await apiClient.getProductBySlug(slug);

      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }
      setProductDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDeatils(slug);
  }, [slug]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {productDetails.image_urls ? (
        <div>
          <img
            src={productDetails?.image_urls[0]}
            className="h-96 w-full object-contain"
          />
          <div className="flex gap-2 w-full overflow-x-auto">
            {productDetails?.image_urls.map((img, index) => (
              <img
                key={index}
                src={img}
                className="h-32 w-32 object-contain border border-gray-200 shadow"
              />
            ))}
          </div>
        </div>
      ) : (
        <div>No Image Available</div>
      )}
      <div>
        <h1 className="font-medium text-3xl">{productDetails.name}</h1>
        <p>{productDetails.description}</p>
        {productDetails.variants && (
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Varients</h3>
            {productDetails.variants.map((varient, index) => (
              <div key={index} className="border border-gray-100 shadow">
                <h3>{varient.name}</h3>
                <p>{paiseToRupee(varient.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
