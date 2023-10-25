import { FaCartArrowDown } from 'react-icons/fa';
import InfoBox from './InfoBox';
import { MdTravelExplore } from 'react-icons/md';
import styles from './home.module.scss';

const ordersIcon = <FaCartArrowDown size={30} color='#5fd3a0' />;
const destinationIcon = <MdTravelExplore size={30} color='#a05fd3' />;

export default function Home() {
  return (
    <div>
      <h1>Admin Home</h1>

      <div className={styles['info-box']}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={'Destinations'}
          count={10}
          icon={destinationIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={`Orders`}
          count={10}
          icon={ordersIcon}
        />
      </div>
    </div>
  );
}
