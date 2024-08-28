'use client';
import { Button } from '@mui/material';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import InputField from '@/src/components/InputField/InputField';
import { LanguageType } from '@/src/components/LanguageToggle/LanguageToggle';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { auth } from '@/src/utils/firebase';
import { validateEmail, validatePassword } from '@/src/utils/validation';

function SignIn() {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useAuthEffect(setAuthUser);
  useEffect(() => {
    if (!!authUser) router.push(`/${params.lang}`);
  }, [authUser]);

  useEffect(() => {
    setError('');
    setEmailError('');
    setPasswordErrors([]);

    if (!validateEmail(email)) {
      setEmailError('Invalid email address. Please enter a valid email.');
    }

    const passwordErrorsList = validatePassword(password);
    if (passwordErrorsList.length > 0) {
      setPasswordErrors(passwordErrorsList);
    }
  }, [email, password]);

  function login(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push(`/${params.lang}`);
      })
      .catch(() => {
        if (!emailError && passwordErrors.length === 0)
          setError('Your account is not found =(');
        setIsLoading(false);
      });
  }

  return (
    <div className="max-w-md mx-auto p-6 m-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
      <form>
        <InputField
          id="email"
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          error={emailError}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          error={passwordErrors.length > 0 ? passwordErrors.join(' ') : ''}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="w-full m-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={login}
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
}

export default SignIn;

