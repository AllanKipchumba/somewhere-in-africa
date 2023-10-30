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
              <div>
                <AiFillHome />
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href='/admin/packages' className={styles.link}>
              <div>
                <MdTravelExplore />
                <p>Packages</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href='/admin/add-package' className={styles.link}>
              <div>
                <BsDatabaseFillAdd />
                <p>Add package</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
