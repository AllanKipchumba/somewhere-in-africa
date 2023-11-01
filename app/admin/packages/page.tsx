'use client';
import { useEffect, useState } from 'react';
import { Search } from '@/app/components/search/Search';
import styles from './packages.module.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import fetchCollection from '@/lib/fetchCollection';
import Pagination from '../components/pagination/Pagination';
import filterPackageBySearch from '@/lib/filterPackagesBySearch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import DeleteDocument from '@/lib/deleteDocument';
import { useRouter } from 'next/navigation';

export default function Packages() {
  const router = useRouter();
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
    try {
      const collectionName = 'packages';
      const collectionData = await fetchCollection(collectionName);
      setData(collectionData);
    } catch (error) {
      Notify.failure('"An error occurred while fetching data."');
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const collectionName = 'packages';
        const collectionData = await fetchCollection(collectionName);
        if (isMounted) {
          setData(collectionData);
        }
      } catch (error) {
        if (isMounted) {
          Notify.failure('An error occurred while fetching data.');
          console.error('Error fetching data:', error);
        }
      }

      if (isMounted) {
        setLoadingStatus(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  //confirm delete with notiflix
  const confirmDelete = (id: string, imageURL: string) => {
    Notiflix.Confirm.show(
      'Delete package!!!',
      'You are about to delete this package',
      'Delete',
      'Cancel',
      function okCb() {
        DeleteDocument(id, imageURL);
      },
      function cancelCb() {
        Notify.info('operation cancelled');
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      }
    );
  };

  return (
    <div className={styles.packages}>
      {loading ? (
        <p>Fetching packages....</p>
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
          <p>Click on the package to view additional details.</p>
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
                      const { id, name, price, imageURL } = packageDetails;

                      return (
                        <tr
                          key={id}
                          onClick={() => router.push(`/admin/packages/${id}`)}
                        >
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>$ {price}</td>
                          <td className={styles.icons}>
                            <FaEdit size={20} color='green' />

                            <FaTrashAlt
                              size={18}
                              color='red'
                              onClick={() => confirmDelete(id!, imageURL)}
                            />
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
