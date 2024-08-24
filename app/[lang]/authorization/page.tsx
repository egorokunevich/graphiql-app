'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/src/utils/firebase';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function login(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (password.length < 6) {
      setError('Password must be more than 6 symbols');
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
      })
      .catch(() => {
        setError('Your account is not found =(');
      });
  }

  return (
    <>
      <div className="container">
        <h1>Sign In Page</h1>
        <form className="flex flex-col p-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          {error ? <p>{error}</p> : ''}
          <button className="button" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
