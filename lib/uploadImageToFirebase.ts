import { storage } from '@/app/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function UploadImageToFirebase(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<{ imageUrl: string; progress: number }> {
  return new Promise((resolve, reject) => {
    let imageUrl: string;
    let progress: number;

    const fileInput = e.target;
    const file = (fileInput.files as FileList)?.[0];

    const storageRef = ref(storage, `package-images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        progress = Math.trunc(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error.message);
        reject(error.message); // Reject the promise on error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl = downloadURL;
          resolve({ imageUrl, progress }); // Resolve the promise with the results
        });
      }
    );
  });
}
