'use client';

import { signOut, User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useAuthEffect } from '@/hooks/useAuthEffect';
import { auth } from '@/utils/firebase';

import './Header.css';

const Header = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useAuthEffect(setAuthUser);

  function userSignOut() {
    signOut(auth);
  }

  return (
    <header className="header">
      <Link href={'/'}>
        <Image
          className="footer__img"
          src="/static/logo.png"
          alt="RS School Logo"
          width={40}
          height={40}
        />
      </Link>

      <div>"Language Toggle"</div>

      {authUser ? (
        <button className='header__button' onClick={userSignOut}>
        Sign Out
      </button>
      ) : (
        <div className="flex">
          <Link className="header__button" href={'/authorization'}>
            Sign In
          </Link>
          <Link className="header__button" href={'/registration'}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
