'use client';
import styles from './packageDetails.module.scss';

type Props = {
  params: {
    id: string;
  };
};

export default function PackageDetails({ params: { id } }: Props) {
  console.log(id);
  return (
    <div className={styles['package-details']}>
      <p>Package details</p>
    </div>
  );
}
