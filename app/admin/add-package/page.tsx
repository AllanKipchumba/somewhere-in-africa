'use client';

import Card from '@/app/components/card/Card';
import styles from './add-package.module.scss';
import React, { useRef, useState } from 'react';
import UploadImageToFirebase from '@/lib/uploadImageToFirebase';
import addDocumentToFirebase from '@/lib/addDocumentToFirebase';

const initialState: Package = {
  name: '',
  imageURL: '',
  price: 0,
  description: '',
  tourDetails: '',
};

export default function AddPackage() {
  const [destination, setDestination] = useState(initialState);
  const [imageUploadProgress, setimageimageUploadProgress] = useState(0);
  const [packageIncludes, setPackageIncludes] = useState<string[]>([]);
  const [packageExcludes, setPackageExcludes] = useState<string[]>([]);
  const includesInputRef = useRef<HTMLInputElement | null>(null);
  const excludesInputRef = useRef<HTMLInputElement | null>(null);

  const addItem = (
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
    setPackage: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (inputValue.trim() !== '') {
        setPackage((prevPackage) => [...prevPackage, inputValue]);
        inputRef.current.value = '';
      }
    }
  };

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

  function savePackageToFirebase(e: React.FormEvent) {
    e.preventDefault();
    try {
      addDocumentToFirebase(destination);
      setDestination({ ...initialState });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card cardClass={styles.card}>
      <div className={styles.destination}>
        <div className={styles.heading}>
          <h1>Add new Package</h1>
        </div>

        <form onSubmit={savePackageToFirebase}>
          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='md:p-4'>
              <label>Package name</label>
              <input
                type='text'
                placeholder='Enter package name'
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

          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='md:p-4'>
              <label>Description</label>
              <textarea
                name='description'
                placeholder='Describe this package'
                cols={10}
                rows={5}
                onChange={(e) => handleInputChange(e)}
                value={destination.description}
              ></textarea>
            </div>

            <div className='md:p-4'>
              <label>Tour Details</label>
              <textarea
                name='tourDetails'
                placeholder='Provide the tour details'
                cols={10}
                rows={5}
                onChange={(e) => handleInputChange(e)}
                value={destination.tourDetails}
              ></textarea>
            </div>
          </div>

          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='md:p-4'>
              <div>
                <Card cardClass={styles.card}>
                  <div>
                    <label>Includes?</label>
                  </div>
                  <div className={styles['wrap-input-and-button']}>
                    <input
                      type='text'
                      placeholder='This package includes?'
                      required
                      name='includes'
                      ref={includesInputRef}
                    />
                    <div
                      onClick={() =>
                        addItem(includesInputRef, setPackageIncludes)
                      }
                    >
                      +Add
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className='md:p-4 mt-4 md:mt-0'>
              <div>
                <Card cardClass={styles.card}>
                  <div>
                    <label>Excludes?</label>
                  </div>
                  <div className={styles['wrap-input-and-button']}>
                    <input
                      type='text'
                      placeholder='This package excludes?'
                      required
                      name='excludes'
                      ref={excludesInputRef}
                    />
                    <div
                      onClick={() =>
                        addItem(excludesInputRef, setPackageExcludes)
                      }
                    >
                      +Add
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className='mt-3'>
            <button className='--btn --btn-primary --btn-lg' type='submit'>
              Save Data
            </button>
          </div>

          {/* <button className='--btn --btn-primary'>
            {detectForm(id, 'Save Product', 'Edit product')}
          </button> */}
        </form>
      </div>
    </Card>
  );
}
