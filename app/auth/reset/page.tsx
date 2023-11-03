'use client';

import { auth } from '@/app/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Card from '@/app/components/card/Card';
import Link from 'next/link';
import styles from '../login/login.module.scss';

export default function Reset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);

        Notify.success('Check your email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        Notify.failure(error.message);
      });
  };

  return (
    <>
      <section className={`container ${styles.auth}`}>
        <Card cardClass={styles.card}>
          <div className={styles.form}>
            <h2>Reset password</h2>

            <form onSubmit={resetPassword}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type='submit' className={styles.btn}>
                {loading ? 'loading...' : 'Reset password'}
              </button>

              <div className={styles.links}>
                <Link href='/auth/login'>&larr;Login page</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
}
