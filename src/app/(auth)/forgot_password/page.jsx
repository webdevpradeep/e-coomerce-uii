'use client';
import { useState } from 'react';
import { apiClient } from '../../../utils/apiClient';
import { useRouter } from 'next/navigation';
import { validateEmail } from '../../../utils/validateFormFields';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const [error, setError] = useState('');
  const enableDisableBtn = () => {
    if (!email.length) {
      return true;
    }
    return false;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setValidationError('');
    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.forgotPassword({
        email: email,
        reset_password_ui_url: 'http://localhost:3000/reset_password',
      });

      console.log(data);
      if (data.error) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setEmail('');
      setValidationError('');
      setError('');
      setIsLoading(false);
      alert(data.message);
      router.push('/');
    } catch (error) {
      console.log(error);
      setError('Somthing Went Wrong');
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleForgotPassword}
        className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
      >
        <h1 className="text-center font-semibold text-3xl">Forgot Password</h1>
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
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}
        <button
          type="submit"
          disabled={enableDisableBtn() ? true : false}
          className={`${
            enableDisableBtn()
              ? 'bg-gray-300 text-gray-100 '
              : 'bg-blue-700 text-gray-100 duration-200 hover:bg-blue-800'
          }px-2 py-1.5 rounded cursor-pointer flex justify-center items-center`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
