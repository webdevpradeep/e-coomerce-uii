'use client';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../../context/GlobalContext';
import { setCookie } from '../../../utils/cookies';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { apiClient } from '../../../utils/apiClient';

const LoginPage = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();

  const [isPassword, setIsPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enableDisableBtn = () => {
    if (!email.length || !password.length) {
      return true;
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiClient.login({ email, password });

      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }

      setCookie('access_token', data.access_token);
      setCookie('refresh_token', data.refresh_token);
      setIsLogin(true);
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center mb-5 font-semibold text-3xl">Login</h1>
        <input
          type="email"
          required
          placeholder="email"
          value={email}
          className="border outline-none rounded px-2 py-1.5"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={isPassword ? 'password' : 'text'}
            required
            placeholder="Password"
            value={password}
            className="border outline-none rounded px-2 py-1.5 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          {isPassword ? (
            <Eye
              className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
              onClick={() => setIsPassword(!isPassword)}
            />
          ) : (
            <EyeOff
              className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
              onClick={() => setIsPassword(!isPassword)}
            />
          )}
        </div>
        <Link
          href="/forgot_password"
          className="text-sm text-right text-blue-500"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          disabled={enableDisableBtn() ? true : false}
          className={`${
            enableDisableBtn()
              ? 'bg-gray-300 text-gray-100 '
              : 'bg-blue-700 text-gray-100 duration-200 hover:bg-blue-800'
          }px-2 py-1.5 rounded cursor-pointer`}
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account?
          <Link href="/signup" className="text-blue-500">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
