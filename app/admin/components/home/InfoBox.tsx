import Card from '@/app/components/card/Card';
import styles from './infoBox.module.scss';

interface propTypes {
  cardClass: any;
  title: string;
  count: number;
  icon: React.ReactNode;
}

export default function InfoBox({ cardClass, title, count, icon }: propTypes) {
  return (
    <div className={styles['info-box']}>
      <Card cardClass={cardClass}>
        <h4 className='font-bold'>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
}
