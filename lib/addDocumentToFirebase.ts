import { db } from '@/app/firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export default function addDocumentToFirebase(document: Destination) {
  const { name, imageURL, price, category, description } = document;

  addDoc(collection(db, 'destinations'), {
    name,
    imageURL,
    price,
    category,
    description,
    createdAt: Timestamp.now().toDate(),
  });
}
