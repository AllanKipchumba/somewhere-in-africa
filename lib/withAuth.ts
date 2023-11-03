'use client';

import { auth } from '@/app/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function WithAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push('/');
      }
    });

    return () => unsubscribe();
  });

  if (!authenticated) {
    return null;
  }

  return children;
}
