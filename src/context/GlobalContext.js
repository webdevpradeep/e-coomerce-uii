'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookies';
import { apiClient } from '../utils/apiClient';
import { useRouter } from 'next/navigation';
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(() => {
    const access_token = getCookie('access_token');

    if (access_token === null || access_token.length <= 0) {
      return false;
    }

    return true;
  });

  const fetchMyCart = async () => {
    try {
      const data = await apiClient.fetchMyCart();
      if (data.error) {
        alert(data.message);
        return;
      }
      console.log('My Cart', data);
      setCart(data.items);
    } catch (error) {
      console.log('Error fetching cart', error);
    }
  };

  const fetchMyProfile = async () => {
    try {
      const data = await apiClient.fetchMyProfile();
      if (data.error) {
        alert(data.message);
        return;
      }
      setUserProfile(data);
      console.log('User Profile', data);
    } catch (error) {
      console.log('Error fetching profile', error);
    }
  };

  const renewToken = async () => {
    try {
      const data = await apiClient.refreshAccessToken();

      const { access_token, access_token_expires_at } = data;
      const accessTokenExpiresAt = Date.parse(access_token_expires_at);

      const currentMilies = Date.now();
      setCookie(
        'access_token',
        access_token,
        parseInt(`${(accessTokenExpiresAt - currentMilies) / 1000}`)
      );

      setIsLogin(true);
    } catch (error) {
      cosole.log('Error renewing token', error);
    }
  };

  const fetchCategoryProducts = async (cat_slug) => {
    try {
      const data = await apiClient.getCategoryProductsBySlug(cat_slug);

      if (data.error) {
        alert(data.message);
        return;
      }
      console.log(data);
      setCategories((prevState) =>
        prevState.map((cat) =>
          cat.slug === cat_slug ? { ...cat, products: data } : cat
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiClient.fetchCategories();

      if (data.error) {
        alert(data.message);
        return;
      }
      console.log(data);
      setCategories(data);

      for (let i = 0; i < data.length; i++) {
        fetchCategoryProducts(data[i].slug);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const accessToken = getCookie('access_token');
      const refreshToken = getCookie('refresh_token');

      if (accessToken || accessToken !== null) {
        return;
      }

      if (refreshToken && refreshToken !== null) {
        renewToken();
        return;
      } else {
        if (isLogin) {
          window.location.reload();
        }
      }
    };

    const loginInterval = setInterval(checkLogin, 1000);
    if (isLogin) {
      fetchMyProfile();
    }

    return () => clearInterval(loginInterval);
  }, [isLogin]);

  useEffect(() => {
    fetchCategories();
    fetchMyCart();
  }, []);

  const value = {
    isLogin,
    setIsLogin,
    categories,
    setCategories,
    userProfile,
    setUserProfile,
    cart,
    setCart,
  };

  return (
    <GlobalContext.Provider value={value}>
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
