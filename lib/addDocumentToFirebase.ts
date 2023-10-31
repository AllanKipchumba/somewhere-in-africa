import { db } from '@/app/firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export default function addDocumentToFirebase(document: Package) {
  const {
    name,
    imageURL,
    price,
    description,
    tourDetails,
    excludes,
    includes,
  } = document;

  addDoc(collection(db, 'packages'), {
    name,
    imageURL,
    price,
    description,
    tourDetails,
    excludes,
    includes,
    createdAt: Timestamp.now().toDate(),
  });
}
