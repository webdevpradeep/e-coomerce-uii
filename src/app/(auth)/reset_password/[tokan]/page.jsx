'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { resetPassword } from '../../../../utils/apiClient';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  console.log(token);

  const enableDisableBtn = () => {
    if (
      !password.length ||
      !confirmPassword.length ||
      password !== confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await resetPassword({ password }, decodeURIComponent(token));
      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert(data.message);
      }

      alert(data.message);
      router.push('/login');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleResetPassword}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center mb-5 font-semibold text-3xl">
          Reset Password
        </h1>
        <input
          type="password"
          required
          value={password}
          placeholder="New Password"
          className="border outline-none rounded px-2 py-1.5"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          required
          value={confirmPassword}
          placeholder="Confirm New Password"
          className="border outline-none rounded px-2 py-1.5"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Save Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
