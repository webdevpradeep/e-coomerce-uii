'use client';
import Link from 'next/link';
import React from 'react';

import { useGlobalContext } from '../../context/GlobalContext';
import { deleteCookie } from '../../utils/cookies';
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';

const Navbar = () => {
  const { isLogin, setIsLogin, categories, userProfile, cart } =
    useGlobalContext();

  console.log('userProfile', userProfile);

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
        <Popover className="relative">
          <PopoverButton className="cursor-pointer">Shop</PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 bg-black/15 transition duration-100 ease-out data-closed:opacity-0"
          />
          <PopoverPanel
            anchor="bottom"
            transition
            className="flex origin-top mt-5 z-20 p-4 flex-col divide-y divide-gray-200 bg-white transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            {categories.map((cat) => (
              <Link className="p-1" href={`/categories/${cat.slug}`}>
                {cat.name}
              </Link>
            ))}
          </PopoverPanel>
        </Popover>
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
            <Popover className="relative">
              <PopoverButton>
                <div className="h-10 w-10 rounded-full bg-gray-300 flex justify-center items-center text-2xl font-semibold text-gray-800 cursor-pointer">
                  {userProfile?.full_name[0].toUpperCase()}
                </div>
              </PopoverButton>
              <PopoverBackdrop
                transition
                className="fixed inset-0 bg-black/15 transition duration-100 ease-out data-closed:opacity-0"
              />
              <PopoverPanel
                anchor="bottom"
                transition
                className="flex origin-top mt-2 z-20 p-4 flex-col divide-y divide-gray-200 bg-white transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
              >
                <Link className="p-1" href={'/cart'}>
                  Cart{' '}
                  {cart?.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                      {cart?.length}
                    </span>
                  )}
                </Link>
                <Link className="p-1" href={'/orders'}>
                  Orders
                </Link>
                <Link className="p-1" href={'/profile'}>
                  Profile
                </Link>
                <Link className="p-1" href={'/address'}>
                  Wish List
                </Link>

                <button onClick={handleLogout}>Log out</button>
              </PopoverPanel>
            </Popover>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
