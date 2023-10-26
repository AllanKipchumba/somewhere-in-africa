'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.scss';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const logo = (
  <div>
    <Link href='/'>
      <Image src='/africa.png' alt='Logo' width={35} height={35} />
    </Link>
  </div>
);

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

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
            <li>
              <Link href='/'>Destinations</Link>
            </li>

            <li>
              <Link href='/admin'>Admin</Link>
            </li>
          </ul>

          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <li>Logout</li>
            </span>
          </div>
        </nav>

        {/* Navigation for mobile */}
        <div className={styles['menu-icon']}>
          <HiOutlineMenuAlt2 size={28} color='#d3a05f' onClick={toggleMenu} />
        </div>
      </div>
    </div>
  );
}
