'use client';

import Card from '@/app/components/card/Card';
import styles from './edit-package.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import UploadImageToFirebase from '@/lib/uploadImageToFirebase';
import List from '../../components/list/List';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FetchDocument } from '@/lib/fetchDocument';
import { db, storage } from '@/app/firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import WithAuth from '@/lib/withAuth';

export default function EditPackage({ params: { id } }: Props) {
  const router = useRouter();
  const [packageIncludes, setPackageIncludes] = useState<string[]>([]);
  const [packageExcludes, setPackageExcludes] = useState<string[]>([]);
  const initialPackageState: Package = {
    name: '',
    imageURL: '',
    price: 0,
    description: '',
    tourDetails: '',
    includes: packageIncludes,
    excludes: packageExcludes,
  };
  const [packageDetails, setPackageDetails] = useState(initialPackageState);
  const [fetchedPackageData, setFetchedPackageData] =
    useState(initialPackageState);
  const [imageUploadProgress, setimageimageUploadProgress] = useState(0);
  const includesInputRef = useRef<HTMLInputElement | null>(null);
  const excludesInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //fetch package data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FetchDocument('packages', id);
        setPackageDetails(data);
        setFetchedPackageData(data);
        setPackageIncludes(data.includes);
        setPackageExcludes(data.excludes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Notify.failure('An error occurred while fetching data.');
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPackageDetails({ ...packageDetails, [name]: value });
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const { imageUrl, progress } = await UploadImageToFirebase(e);
      setimageimageUploadProgress(progress);
      setPackageDetails({ ...packageDetails, imageURL: imageUrl });
      Notify.info('Image Uploaded successfully');
    } catch (error) {
      console.log(error);
      Notify.failure('An error occurred during image upload');
    }
  }

  function editPackage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    //delete previous image before providing a new image
    if (packageDetails.imageURL !== fetchedPackageData.imageURL) {
      const storageRef = ref(storage, fetchedPackageData.imageURL);
      deleteObject(storageRef);
    }

    try {
      //update package
      const {
        name,
        imageURL,
        price,
        description,
        tourDetails,
        includes,
        excludes,
      } = packageDetails;
      setDoc(doc(db, 'packages', id), {
        name,
        imageURL,
        price,
        description,
        tourDetails,
        includes,
        excludes,
        createdAt: fetchedPackageData.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setPackageDetails({ ...initialPackageState });
      setPackageIncludes([]);
      setPackageExcludes([]);
      setimageimageUploadProgress(0);
      setLoading(false);
      Notify.success('Package edited successfully');
      router.push(`/admin/packages/${id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      Notify.failure('An error occurred during data submission');
    }
  }

  // add item to includes or excludes arrays and to package details
  function addItem(
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
    setPackage: React.Dispatch<React.SetStateAction<string[]>>,
    packageType: PackageType
  ) {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (inputValue.trim() !== '') {
        setPackage((prevPackage) => [...prevPackage, inputValue]);
        inputRef.current.value = '';
        setPackageDetails((prevPackageDetails) => ({
          ...prevPackageDetails,
          [packageType]: [...prevPackageDetails[packageType], inputValue],
        }));
      }
    }
  }

  function removeItemFromArray<T>(arr: T[], item: T): T[] {
    return arr.filter((element) => element !== item);
  }

  //remove item from the includes or excludes list
  function removeItem(item: string, packageType: string) {
    if (packageType === 'includes') {
      const updatedPackageIncludes = removeItemFromArray(packageIncludes, item);
      setPackageIncludes(updatedPackageIncludes);

      setPackageDetails((prevPackageDetails) => ({
        ...prevPackageDetails,
        includes: updatedPackageIncludes,
      }));
    } else if (packageType === 'excludes') {
      const updatedPackageExcludes = removeItemFromArray(packageExcludes, item);
      setPackageExcludes(updatedPackageExcludes);

      setPackageDetails((prevPackageDetails) => ({
        ...prevPackageDetails,
        excludes: updatedPackageExcludes,
      }));
    }
  }

  return (
    <WithAuth>
      <Card cardClass={styles.card}>
        <div className={styles.package}>
          <div className={styles.heading}>
            <h1>Edit Package</h1>
          </div>

          <form onSubmit={editPackage}>
            <div className='grid grid-cols-1'>
              <div className='md:p-4'>
                <label>Package name</label>
                <input
                  type='text'
                  placeholder='Enter package name'
                  required
                  name='name'
                  value={packageDetails.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className='md:p-4'>
                <label>Image</label>
                <Card cardClass={styles.group}>
                  <input
                    type='file'
                    accept='image/*'
                    placeholder='packageDetails image'
                    name='image'
                    ref={fileInputRef}
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

                  {packageDetails.imageURL !== '' && (
                    <input
                      type='text'
                      required
                      placeholder='image URL'
                      name='imageURL'
                      value={packageDetails.imageURL}
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
                  value={packageDetails.price}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className='grid grid-cols-1'>
              <div className='md:p-4'>
                <label>Description</label>
                <textarea
                  name='description'
                  placeholder='Describe this package'
                  cols={10}
                  rows={15}
                  onChange={(e) => handleInputChange(e)}
                  value={packageDetails.description}
                ></textarea>
              </div>

              <div className='md:p-4'>
                <label>Tour Details</label>
                <textarea
                  name='tourDetails'
                  placeholder='Provide the tour details'
                  cols={10}
                  rows={15}
                  onChange={(e) => handleInputChange(e)}
                  value={packageDetails.tourDetails}
                ></textarea>
              </div>
            </div>

            <div className='grid grid-cols-1'>
              <div className='md:p-4'>
                <div>
                  <Card cardClass={styles.card}>
                    <div>
                      <label>Includes?</label>
                      {packageIncludes.length !== 0 && (
                        <List
                          list={packageIncludes}
                          onRemoveItem={removeItem}
                          packageType='includes'
                        />
                      )}
                    </div>
                    <div className={styles['wrap-input-and-button']}>
                      <input
                        type='text'
                        placeholder='This package includes?'
                        name='includes'
                        ref={includesInputRef}
                      />
                      <div
                        onClick={() =>
                          addItem(
                            includesInputRef,
                            setPackageIncludes,
                            'includes'
                          )
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
                      {packageExcludes.length !== 0 && (
                        <List
                          list={packageExcludes}
                          onRemoveItem={removeItem}
                          packageType='excludes'
                        />
                      )}
                    </div>
                    <div className={styles['wrap-input-and-button']}>
                      <input
                        type='text'
                        placeholder='This package excludes?'
                        name='excludes'
                        ref={excludesInputRef}
                      />
                      <div
                        onClick={() =>
                          addItem(
                            excludesInputRef,
                            setPackageExcludes,
                            'excludes'
                          )
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
                {loading ? 'submitting...' : 'Update Package'}
              </button>
              {error && (
                <p className='mt-3 text-red-500'>
                  Error: Unable to save the data.
                </p>
              )}
            </div>
          </form>
        </div>
      </Card>
    </WithAuth>
  );
}
