'use client';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && router.push('/admin');
    });
  });

  return (
    <main className={styles.home}>
      <h1>Somewhere in Africa Admin portal</h1>
      <div className={styles.auth}>
        <Link href='/auth/login'>
          <button>Login</button>
        </Link>
      </div>
    </main>
  );
}
