import { Search } from '@/app/components/search/Search';
import styles from './destinations.module.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Destinations() {
  return (
    <div className={styles.table}>
      <h1>Destinations</h1>
      <div className={styles.search}>
        <p>10 destinations found</p>
        <Search />
      </div>

      <div>
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
            <tr>
              <td> 1</td>
              <td>
                {/* <img src={imageURL} alt={name} style={{ width: '100px' }} /> */}
              </td>
              <td>name</td>
              <td>category</td>
              <td>price</td>
              <td className='icon'>
                <FaEdit size={20} color='green' />

                <FaTrashAlt size={18} color='red' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
