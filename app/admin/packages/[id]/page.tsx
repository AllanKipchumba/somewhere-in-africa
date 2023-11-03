'use client';
import Image from 'next/image';
import styles from './packageDetails.module.scss';
import PackageList from './components/PackageList';
import { BiSolidEdit } from 'react-icons/bi';
import { FetchDocument } from '@/lib/fetchDocument';
import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PackageDetails({ params: { id } }: Props) {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState<Package[] | any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FetchDocument('packages', id);
        setFetchedData(data);
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

  return (
    <div className={styles['package-details']}>
      {error && (
        <p className='m-4 text-2xl font-bold text-red-500'>
          An error occurred while fetching data
        </p>
      )}
      {loading && <p className='m-4 text-2xl font-bold'>Fetching data...</p>}
      {fetchedData.length !== 0 && (
        <div>
          <div className='md:flex md:items-center md:justify-center'>
            <Image
              src={fetchedData.imageURL}
              width={600}
              height={300}
              alt='package'
            />
          </div>
          <div className={styles.package}>
            <h1 className={styles.heading}>Package details</h1>

            <div className='grid gap-4 md:grid-cols-2 sm:grid-cols-1'>
              <div className={styles.name}>
                <div className='flex gap-4'>
                  <h2>Name:</h2>
                  <h2>{fetchedData.name}</h2>
                </div>
                <p>{fetchedData.description}</p>
              </div>
              <div className={styles['tour-details']}>
                <h2>Tour details</h2>
                <p>{fetchedData.tourDetails}</p>
              </div>
            </div>
            <div className='grid gap-4 md:grid-cols-2 sm:grid-cols-1'>
              <div>
                <h2>Includes</h2>
                <PackageList
                  list={fetchedData.includes}
                  packageType='includes'
                />
              </div>
              <div>
                <h2>Excludes</h2>
                <PackageList
                  list={fetchedData.excludes}
                  packageType='excludes'
                />
              </div>
            </div>

            <div className={styles.price}>
              <h2>Price:</h2>
              <h1>${fetchedData.price}</h1>
            </div>

            <div className='grid mt-3 gap-4 grid-cols-2 '>
              <div
                className={`${styles.edit} md:mt-[2rem]`}
                onClick={() => router.push(`/admin/edit-package/${id}`)}
              >
                <BiSolidEdit />
                <p>Edit this package</p>
              </div>
              <div className={`${styles.back} md:mt-[2rem]`}>
                <Link href='/admin/packages'>
                  <h1> &larr; &nbsp;Back</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
