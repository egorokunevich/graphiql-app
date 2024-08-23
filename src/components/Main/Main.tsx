'use client';

import { User } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

import { useAuthEffect } from '@/hooks/useAuthEffect';

import './Main.css';

const MainContent = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useAuthEffect(setAuthUser);

  return (
    <main className="main">
      {authUser ? (
        <div>
          <div>{`Welcome Back, ${authUser?.email}!`}</div>
        </div>
      ) : (
        <div>{'Welcome!'}</div>
      )}
      {authUser && (
        <div>
          <Link className="main__link" href={'/rest-client'}>
            REST Client
          </Link>
          <Link className="main__link" href={'/graphiql-client'}>
            GraphiQL Client
          </Link>
          <Link className="main__link" href={'/history'}>
            History
          </Link>
        </div>
      )}
    </main>
  );
};

export default MainContent;
