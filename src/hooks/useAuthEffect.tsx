import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect } from 'react';

import { auth } from '@/src/utils/firebase';

export function useAuthEffect(setAuthUser: (user: User | null) => void) {
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
}
