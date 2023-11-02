import { db } from '@/app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function editDocument() {
  //delete previous image before providing a new image
  // if (imageURL !== productEdit.imageURL) {
  //   const storageRef = ref(storage, productEdit.imageURL);
  //   deleteObject(storageRef);
  // }
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
