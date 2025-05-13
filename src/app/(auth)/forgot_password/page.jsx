'use client';
import { useState } from 'react';
import { apiClient } from '../../../utils/apiClient';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const enableDisableBtn = () => {
    if (!email.length) {
      return true;
    }
    return false;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await apiClient.forgotPassword({
        email: email,
        reset_password_ui_url: 'http://localhost:3000/reset_password',
      });

      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }
      setEmail('');

      alert(data.message);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleForgotPassword}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center mb-5 font-semibold text-3xl">
          Forgot Password
        </h1>

        <input
          type="email"
          required
          placeholder="email"
          value={email}
          className="border outline-none rounded px-2 py-1.5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={enableDisableBtn() ? true : false}
          className={`${
            enableDisableBtn()
              ? 'bg-gray-300 text-gray-100 '
              : 'bg-blue-700 text-gray-100 duration-200 hover:bg-blue-800'
          }px-2 py-1.5 rounded cursor-pointer`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
