import styles from './admin.module.scss';
import Navigation from './components/navigation/Navigation';
import Mobile from './components/navigation/mobile/Mobile';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className={`${styles.layout}`}>
        <div className={`${styles.navigation}`}>{<Navigation />}</div>
        <div className={`${styles.content}`}>{children}</div>
      </div>
      <div className={styles['mobile-navigation']}>
        <Mobile />
      </div>
    </div>
  );
}
