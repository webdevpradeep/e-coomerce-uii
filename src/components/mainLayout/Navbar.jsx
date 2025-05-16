'use client';
import Link from 'next/link';
import React from 'react';

import { useGlobalContext } from '../../context/GlobalContext';
import { deleteCookie } from '../../utils/cookies';

const Navbar = () => {
  const { isLogin, setIsLogin } = useGlobalContext();

  const handleLogout = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-10 bg-gray-800 text-gray-50 flex justify-between gap-5 items-center px-5">
      <h2 className="text-2xl">Amazing Cart</h2>
      <nav className="hidden md:flex gap-5">
        <Link href={'/'}>Home</Link>
        <Link href={'/shop'}>Shop</Link>
      </nav>
      <nav className="flex gap-5">
        {!isLogin ? (
          <>
            {' '}
            <Link href={'/login'}>Login</Link>
            <Link href={'/signup'}>Signup</Link>
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <button>Account</button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
