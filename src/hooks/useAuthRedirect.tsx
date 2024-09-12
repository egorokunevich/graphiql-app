'use client';

import { User } from 'firebase/auth';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLayoutContext } from '@/src/context/LayoutContext';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { LanguageType } from '@/src/types/index';

const useAuthRedirect = () => {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setMainPage } = useLayoutContext();

  useAuthEffect((user) => {
    setAuthUser(user);
    setLoading(false);
  });

  useEffect(() => {
    if (!loading && !authUser) {
      setMainPage(false);
      router.push(`/${params.lang}`);
    }
  }, [authUser, loading, router, params.lang]);

  return { authUser, loading };
};

export default useAuthRedirect;
