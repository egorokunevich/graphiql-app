'use client';
import { TextField, Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LanguageType } from '@/src/components/LanguageToggle/LanguageToggle';
import { auth } from '@/src/utils/firebase';
import { validateEmail, validatePassword } from '@/src/utils/validation';

function SignUp() {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmailError('');
    if (!validateEmail(email)) {
      setEmailError('Invalid email address. Please enter a valid email.');
    }
  }, [email]);

  useEffect(() => {
    setPasswordErrors([]);
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
    }
  }, [password]);

  async function register(event: { preventDefault: () => void }) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!emailError && passwordErrors.length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(`/${params.lang}`);
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 m-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={register}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <TextField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <TextField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
          {passwordErrors.length > 0 && <p>{passwordErrors.join(' ')}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Button
            type="submit"
            className="w-full m-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Create Account
          </Button>
        )}
      </form>
    </div>
  );
}

export default SignUp;

