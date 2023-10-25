'use client';

import React from 'react';
import styles from './navigation.module.scss';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdTravelExplore } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function Navigation() {
  // const router = useRouter();

  return (
    <div className={styles.navigation}>
      <div className={styles.user}>
        <FaUserCircle size={30} color='#d3a05f' />
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/admin' className={styles.link}>
              <AiFillHome />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href='/admin/destinations' className={styles.link}>
              <MdTravelExplore />
              <p>Destinations</p>
            </Link>
          </li>
          <li>
            <Link href='/admin/add-destination' className={styles.link}>
              <BsDatabaseFillAdd />
              <p>Add Destination</p>
            </Link>
          </li>
          <li>
            <Link href='/admin/orders' className={styles.link}>
              <FaCartArrowDown />
              <p>Orders</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
