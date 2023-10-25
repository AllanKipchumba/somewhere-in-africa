import styles from './card.module.scss';

interface propTypes {
  children: React.ReactNode;
  cardClass: any;
}

export default function Card({ children, cardClass }: propTypes) {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
}
