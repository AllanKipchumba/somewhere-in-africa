import { FaCartArrowDown } from 'react-icons/fa';
import InfoBox from './InfoBox';
import { MdTravelExplore } from 'react-icons/md';
import styles from './home.module.scss';

const ordersIcon = <FaCartArrowDown size={30} color='#5fd3a0' />;
const destinationIcon = <MdTravelExplore size={30} color='#a05fd3' />;

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Admin Home</h1>

      <p>Manage packages and explore related pages for package management.</p>
      <section>
        <p>
          <strong>Click &apos;Packages&apos; </strong>to view and manage
          existing packages.
        </p>
        <p>
          <strong>Click &apos;Add Package&apos;</strong> to add a new package to
          the database.
        </p>
      </section>
    </div>
  );
}
