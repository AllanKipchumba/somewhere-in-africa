import { db } from '@/app/firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default async function fetchCollection(collectionName: string) {
  try {
    const docRef = collection(db, collectionName);
    const q = query(docRef, orderBy('createdAt', 'desc'));

    return new Promise<Destination[]>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // Extract the data
          const allData: Destination[] | any = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Clean up the listener
          unsubscribe();

          resolve(allData);
        },
        (error) => {
          // Handle errors
          console.error('Error fetching collection:', error);
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
}
