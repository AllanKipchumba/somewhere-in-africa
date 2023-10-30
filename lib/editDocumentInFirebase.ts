import { db } from '@/app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function editDocument() {
  try {
    //update product
    setDoc(doc(db, 'products'), {
      //   name,
      //   imageURL,
      //   price,
      //   category,
      //   brand,
      //   description,
      //   createdAt: productEdit.createdAt,
      //   editedAt: Timestamp.now().toDate(),
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
