'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import styles from './login.module.scss';
import Card from '@/app/components/card/Card';
import Link from 'next/link';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  //sign in user with email and password
  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        router.push('/admin');
        Notify.success('Login Succesful...');
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
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type='email'
                placeholder='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.password}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={styles.icon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size='18' />
                  ) : (
                    <AiOutlineEye size='18' />
                  )}
                </span>
              </div>

              <button className={styles.btn} type='submit'>
                {loading ? 'loading...' : 'Login'}
              </button>

              <div className={styles.links}>
                <Link href='/auth/reset'>Forgot password?</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
}
