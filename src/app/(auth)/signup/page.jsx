'use client';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../../context/GlobalContext';
import Link from 'next/link';
import { useState } from 'react';
import { apiClient } from '../../../utils/apiClient';
import { validateEmail, validateName } from '../../../utils/validateFormFields';

const SignupPage = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState({
    email: '',
    fullName: '',
  });
  const enableDisableBtn = () => {
    if (!email.length || !fullName.length) {
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setValidationError({ email: '', fullName: '' });

    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
      setIsLoading(false);
      return;
    }

    if (!validateName(fullName)) {
      setValidationError((prev) => ({
        ...prev,
        fullName: 'Please provide a valid name',
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.signup({
        email: email,
        full_name: fullName,
        reset_password_ui_url: 'http://localhost:3000/reset_password',
      });

      console.log(data);
      if (data.error) {
        setIsLoading(false);
        setError(data.message);
        return;
      }
      setEmail('');
      setFullName('');
      setIsLoading(false);
      alert(data.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError('Something went Wrong');
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center font-semibold text-3xl">Create Account</h1>

        {error && (
          <p className="text-sm text-red-500 text-center mt-1">{error}</p>
        )}

        <input
          type="text"
          required
          placeholder="Your Name"
          value={fullName}
          className="border outline-none rounded px-2 py-1.5 w-full mt-5"
          onChange={(e) => setFullName(e.target.value)}
        />
        {validationError.fullName && (
          <p className="text-sm text-red-500">{validationError.fullName}</p>
        )}
        <input
          type="email"
          required
          placeholder="email"
          value={email}
          className="border outline-none rounded px-2 py-1.5"
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationError.email && (
          <p className="text-sm text-red-500">{validationError.email}</p>
        )}
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
            'Sign up'
          )}
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
