'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { auth } from '@/utils/firebase';

function SignUp() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 function register(event: { preventDefault: () => void; }) {
  event.preventDefault();
  if (password.length < 6) {
   setError('Password must be more than 6 symbols');
  }
  
  createUserWithEmailAndPassword(auth, email, password).then(() => {
   setEmail('');
   setPassword('');
   setError('');
  });
 }

 return (
  <>
  <div className="container">
   <Header />
    <h1>Sign Up Page</h1>
    <form  className='flex flex-col p-10' onSubmit={register}>
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
     {error ? <p>{error}</p> : ''}
     <button className='button'>Create</button>
    </form>
    <Footer />
   </div>
  </>
 );
}

export default SignUp;
