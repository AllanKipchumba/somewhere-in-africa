'use client';
import { useEffect, useState } from 'react';
import { Search } from '@/app/components/search/Search';
import styles from './packages.module.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import fetchCollection from '@/lib/fetchCollection';
import Pagination from '../components/pagination/Pagination';
import filterPackageBySearch from '@/lib/filterPackagesBySearch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Packages() {
  const [data, setData] = useState<Package[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoadingStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(10);
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = data.slice(indexOfFirstPackage, indexOfLastPackage);

  useEffect(() => {
    if (search !== '') {
      setData(filterPackageBySearch(data, search));
    } else fetchPackages();
  }, [data, search]);

  async function fetchPackages() {
    setLoadingStatus(true);
    try {
      const collectionName = 'packages';
      const collectionData = await fetchCollection(collectionName);
      setData(collectionData);
      setLoadingStatus(false);
    } catch (error) {
      Notify.failure('"An error occurred while fetching data."');
      console.error('Error fetching data:', error);
      setLoadingStatus(false);
    }
  }
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className={styles.packages}>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <h1>Packages</h1>
          <div className={styles.search}>
            <p>{data.length} packages found</p>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            {data.length === 0 ? (
              <p>No record found.</p>
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackages.map((packageDetails, index) => {
                      const { id, name, price } = packageDetails;

                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
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
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={packagesPerPage}
                  totalItems={data.length}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
