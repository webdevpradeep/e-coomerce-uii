'use client';
import React, { useEffect } from 'react';
import { baseURL } from '../../../../utils/apiClient';
import { useParams } from 'next/navigation';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const fetchProductDeatils = async (slug) => {
    try {
      const res = await fetch(`${baseURL}/products/${slug}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDeatils(slug);
  }, [slug]);

  return <div>ProductDetailsPage</div>;
};

export default ProductDetailsPage;
