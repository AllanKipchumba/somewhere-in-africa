'use client';
import { useEffect, useState } from 'react';
import { Search } from '@/app/components/search/Search';
import styles from './packages.module.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import fetchCollection from '@/lib/fetchCollection';
import Image from 'next/image';

export default function Packages() {
  const [data, setData] = useState<any[]>([]);

  async function fetchPackages() {
    try {
      const collectionName = 'destinations';
      const collectionData = await fetchCollection(collectionName);
      setData(collectionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className={styles.destinations}>
      <h1>Packages</h1>
      <div className={styles.search}>
        <p>{data.length} packages found</p>
        <Search />
      </div>

      <div>
        {data.length === 0 ? (
          <p>No record found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((destination, index) => {
                const { id, imageURL, name, category, price } = destination;
                console.log(imageURL);

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image src={imageURL} alt={name} width={70} height={70} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>Ksh {price}</td>
                    <td className='icon flex gap-2'>
                      <FaEdit size={20} color='green' />

                      <FaTrashAlt size={18} color='red' />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
