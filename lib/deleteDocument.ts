import { db, storage } from '@/app/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Notify } from 'notiflix';

export default async function DeleteDocument(id: string, imageURL: string) {
  try {
    // Delete package from Firestore
    await deleteDoc(doc(db, 'packages', id));

    // Delete image from Firebase Storage
    const storageRef = ref(storage, imageURL);
    await deleteObject(storageRef);

    // Show a success notification
    Notify.info('Package deleted successfully');
  } catch (error) {
    console.log(error);
    Notify.info('An error occurred while deleting the package');
  }
}
