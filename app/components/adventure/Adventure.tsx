'use client';
import fetchCollection from '@/lib/fetchCollection';
import styles from './adventure.module.scss';
import { useEffect, useState } from 'react';
import AdventureItem from './adventureItem/AdventureItem';

export default function Adventures() {
  const [data, setData] = useState<Destination[]>([]);

  async function fetchDestinations() {
    try {
      const collectionName = 'destinations';
      const collectionData = await fetchCollection(collectionName);
      setData(collectionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className={styles.adventures}>
      <AdventureItem />
      <AdventureItem />
      <AdventureItem />
    </div>
  );
}
