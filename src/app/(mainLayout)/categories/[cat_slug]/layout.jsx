'use client';
import Link from 'next/link';
import { apiClient } from '../../../../utils/apiClient';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { ChevronRight, Menu } from 'lucide-react';
import { createContext } from 'vm';

const CatLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cat_slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [attributes, setAttributes] = useState([]);

  const { categories } = useGlobalContext();

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

  useEffect(() => {
    getCategoryDetails(cat_slug);

    if (window !== undefined && window.innerWidth > 768) {
      setIsDrawerOpen(true);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <aside
        className={`${
          isDrawerOpen ? 'w-96 p-5' : 'w-0 p-0'
        } fixed top-16 left-0 bottom-0 overflow-y-auto myscrollbar bg-green-50 h-screen transition-all duration-500`}
      >
        <div className="mb-5 border-b-2 border-gray-300 pb-5">
          <h1 className="text-2xl text-green-800 font-semibold mb-2">
            Categories
          </h1>
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
                    className={`text-lg text-gray-900 hover:underline ${
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
                <p className="text-green-800">{attr.name}</p>
                {attr.values.map((value) => (
                  <div className="flex items-center gap-2 mt-1">
                    <input id={value} type="checkbox" />
                    <label htmlFor={value} className="cursor-pointer">
                      {value}
                    </label>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </aside>
      <main
        className={`${
          isDrawerOpen ? 'ml-96' : 'ml-0'
        } transition-all duration-500`}
      >
        <div className="p-4">
          {categories.length ? (
            <div className="inline-flex items-center gap-2">
              <Menu onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
              <span className="text-sm text-gray-500">Categories</span>
              <ChevronRight size={15} className="inline-block" />

              <p className="text-sm">
                {loading ? (
                  <span className="h-6 bg-gray-300 animate-pulse rounded"></span>
                ) : (
                  <span className="font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="h-6 inline-block w-sm bg-gray-300 animate-pulse rounded"></div>
          )}
        </div>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default CatLayout;
