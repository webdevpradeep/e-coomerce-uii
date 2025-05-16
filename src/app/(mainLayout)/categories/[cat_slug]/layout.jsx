'use client';
import Link from 'next/link';
import { apiClient } from '../../../../utils/apiClient';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const catLayout = ({ children }) => {
  const { cat_slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCatAttributes = async (id) => {
    setLoading(true);
    try {
      const data = await apiClient.getAttributesByCategory(id);
      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }
      console.log('attribute', data);
      setLoading(false);
      setAttributes(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCategoryDetails = async (cat_slug) => {
    setLoading(true);
    try {
      const data = await apiClient.getCategoryBySlug(cat_slug);

      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }
      console.log('cat', data);
      fetchCatAttributes(data.id);
      setCategory(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    getCategoryDetails(cat_slug);
    fetchCategories();
  }, []);

  return (
    <div>
      <aside className="fixed top-16 left-0 bottom-0 w-96 overflow-y-auto bg-red-100 h-screen p-5">
        <div className="mb-5 border-b-2 border-gray-300 pb-5">
          <h1 className="text-2xl font-semibold mb-2">Categories</h1>
          {loading ? (
            [...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-6 bg-gray-300 animate-pulse rounded mb-2"
              ></div>
            ))
          ) : (
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`text-lg text-blue-500 hover:underline ${
                      cat_slug === category.slug ? 'font-semibold' : ''
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-300 animate-pulse rounded mb-2"
            ></div>
          ))
        ) : (
          <ul className="flex flex-col gap-2">
            {attributes.map((attr) => (
              <li key={attr.id}>
                <p className={`text-lg text-blue-500 hover:underline`}>
                  {attr.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </aside>
      <main className="ml-96">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">{category.name}</h1>
        </div>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default catLayout;
