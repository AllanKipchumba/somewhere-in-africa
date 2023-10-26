import Card from '../../card/Card';
import styles from './adventureItem.module.scss';

export default function AdventureItem(item: any) {
  return (
    <div className={`${styles.item} `}>
      <Card cardClass={styles.card}>
        <div className={styles.content}>
          <h3>Category</h3>
          {/* image */}
          <h2>Name</h2>
          <p>description</p>
          <p>Price</p>
        </div>
        <div className={styles.order}>
          <button>Order now</button>
        </div>
      </Card>
    </div>
  );
}
