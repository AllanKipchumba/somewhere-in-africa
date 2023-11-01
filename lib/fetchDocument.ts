import { db } from '@/app/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const FetchDocument = async (
  collectionName: string,
  documentID: string
) => {
  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const obj: Package[] | any = {
      id: documentID,
      ...docSnap.data(),
    };
    return obj;
  } else {
    Notify.failure(`Document not found`);
    return null;
  }
};
