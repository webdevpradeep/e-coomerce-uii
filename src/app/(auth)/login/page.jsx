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

  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const enableDisableBtn = () => {
    if (!email.length || !password.length) {
      return true;
    }
    return false;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setValidationError({ email: '', password: '' });
    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character',
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.login({ email, password });

      console.log(data);
      if (data.error) {
        setError(data.message);
        return;
      }

      const {
        access_token,
        refresh_token,
        refresh_token_expires_at,
        access_token_expires_at,
      } = data;

      const currentMilies = Date.now();
      const accesTokenExpiresAt = Date.parse(access_token_expires_at);
      const refreshTokenExpiresAt = Date.parse(refresh_token_expires_at);

      setCookie(
        'access_token',
        access_token,
        parseInt(`${(accesTokenExpiresAt - currentMilies) / 1000}`)
      );
      setCookie(
        'refresh_token',
        refresh_token,
        parseInt(`${(refreshTokenExpiresAt - currentMilies) / 1000}`)
      );
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setValidationError({ email: '', password: '' });
      setError('');
      setIsLoading(false);
      router.push('/', { replace: true });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      setValidationError({ email: '', password: '' });
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center font-semibold text-3xl">Login</h1>
        {error && (
          <p className="text-sm text-red-500 text-center mt-1">{error}</p>
        )}
        <input
          type="email"
          required
          placeholder="email"
          value={email}
          className="border outline-none rounded px-2 py-1.5 mt-5"
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationError.email && (
          <p className="text-sm text-red-500">{validationError.email}</p>
        )}
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
        {validationError.password && (
          <p className="text-sm text-red-500">{validationError.password}</p>
        )}
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
          }px-2 py-1.5 rounded cursor-pointer flex items-center justify-center`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            'Login'
          )}
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
