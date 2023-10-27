import styles from './mobile.module.scss';
import { MdTravelExplore } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import Link from 'next/link';

export default function Mobile() {
  return (
    <div className={styles.mobile}>
      <nav>
        <ul>
          <li>
            <Link href='/admin' className={styles.link}>
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link href='/admin/destinations' className={styles.link}>
              <MdTravelExplore />
            </Link>
          </li>
          <li>
            <Link href='/admin/add-destination' className={styles.link}>
              <BsDatabaseFillAdd />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
