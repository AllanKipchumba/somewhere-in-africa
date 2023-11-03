'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navBar.module.scss';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';

const logo = (
  <div>
    <Link href='/'>
      <Image
        src='/africa.png'
        alt='Logo'
        width={35}
        height={35}
        className={styles.img}
      />
    </Link>
  </div>
);

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && setAuthenticated(true);
    });
  });

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setAuthenticated(false);
        Notify.info('You are logged out');
        router.push('/');
      })
      .catch((error) => {
        Notify.failure(`Logout failed: ${error.message}`);
      });
  };

  return (
    <div className={`${styles.navigation}`}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes
                size={22}
                className={styles['close-icon']}
                color='#161c1c'
                onClick={hideMenu}
              />
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
            {authenticated && (
              <>
                <li>
                  <Link href='/admin'>Admin</Link>
                </li>
                <li onClick={logoutUser}>Logout</li>
              </>
            )}
          </ul>

          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>{/* <li>Logout</li> */}</span>
          </div>
        </nav>

        {/* Navigation for mobile */}
        <div className={styles['menu-icon']}>
          <HiOutlineMenuAlt2 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </div>
  );
}
