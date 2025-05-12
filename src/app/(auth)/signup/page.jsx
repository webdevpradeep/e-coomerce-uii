'use client';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../../context/GlobalContext';
import Link from 'next/link';
import { useState } from 'react';
import { apiClient } from '../../../utils/apiClient';

const SignupPage = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const enableDisableBtn = () => {
    if (!email.length || !fullName.length) {
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({
        email: email,
        full_name: fullName,
        reset_password_ui_url: 'http://localhost:3000/reset_password',
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }
      setEmail('');
      setFullName('');
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center mb-5 font-semibold text-3xl">
          Create Account
        </h1>

        <input
          type="text"
          required
          placeholder="Your Name"
          value={fullName}
          className="border outline-none rounded px-2 py-1.5 w-full"
          onChange={(e) => setFullName(e.target.value)}
        />

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
          Sign up
        </button>
        <p className="text-sm">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
