import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import styles from './list.module.scss';

export default function List(props: ListProps) {
  return (
    <div className={styles.list}>
      <p>Click an item to remove it from the list</p>
      {props.list.map((item, index) => {
        return (
          <ul key={index}>
            <li onClick={() => props.onRemoveItem(item, props.packageType)}>
              {props.packageType === 'includes' ? (
                <BsCheck2Circle />
              ) : (
                <MdOutlineCancel />
              )}

              <p>{item}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
