'use client';

import Card from '@/app/components/card/Card';
import styles from './add-destination.module.scss';
import { useState } from 'react';
import UploadImageToFirebase from '@/lib/uploadImageToFirebase';
import addDocumentToFirebase from '@/lib/addDocumentToFirebase';

const initialState: Destination = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  description: '',
};

export default function AddDestination() {
  const [destination, setDestination] = useState(initialState);
  const [imageUploadProgress, setimageimageUploadProgress] = useState(0);

  const currentURL = window.location.href;
  console.log(currentURL);

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDestination({ ...destination, [name]: value });
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const { imageUrl, progress } = await UploadImageToFirebase(e);
      setimageimageUploadProgress(progress);
      setDestination({ ...destination, imageURL: imageUrl });
    } catch (error) {
      console.log(error);
    }
  }

  function addDestination(e: React.FormEvent) {
    e.preventDefault();
    try {
      addDocumentToFirebase(destination);
      setDestination({ ...initialState });
    } catch (error) {
      console.log(error);
    }
  }

  function editDestination() {}

  return (
    <Card cardClass={styles.card}>
      <div className={styles.destination}>
        <div className={styles.heading}>
          <h1>Add new destination</h1>
        </div>

        <form onSubmit={addDestination}>
          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='md:p-4'>
              <label>Destination</label>
              <input
                type='text'
                placeholder='Name'
                required
                name='name'
                value={destination.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='md:p-4'>
              <label>Image</label>
              <Card cardClass={styles.group}>
                <input
                  type='file'
                  accept='image/*'
                  placeholder='destination image'
                  name='image'
                  onChange={(e) => uploadImage(e)}
                />

                {imageUploadProgress !== 0 && (
                  <div className={styles.progress}>
                    <div
                      className={styles['progress-bar']}
                      style={{ width: `${imageUploadProgress}%` }}
                    >
                      {imageUploadProgress < 100
                        ? `Uploading ${imageUploadProgress}%`
                        : `Upload Complete ${imageUploadProgress}%`}
                    </div>
                  </div>
                )}

                {destination.imageURL !== '' && (
                  <input
                    type='text'
                    required
                    placeholder='image URL'
                    name='imageURL'
                    value={destination.imageURL}
                    disabled
                  />
                )}
              </Card>
            </div>
          </div>

          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='md:p-4'>
              <label>Category</label>
              <input
                type='text'
                placeholder='Category'
                required
                name='category'
                value={destination.category}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='md:p-4'>
              <label>Price</label>
              <input
                type='number'
                placeholder='price'
                required
                name='price'
                value={destination.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>

          <div>
            <div>
              <label>Description</label>
              <textarea
                name='description'
                placeholder='Describe this destination'
                cols={10}
                rows={5}
                onChange={(e) => handleInputChange(e)}
                value={destination.description}
              ></textarea>
            </div>

            <div>
              <button className='--btn --btn-primary --btn-lg' type='submit'>
                save
              </button>
            </div>
          </div>

          {/* <button className='--btn --btn-primary'>
            {detectForm(id, 'Save Product', 'Edit product')}
          </button> */}
        </form>
      </div>
    </Card>
  );
}
