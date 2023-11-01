import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import styles from './packageList.module.scss';

export default function PackageList(props: ListProps) {
  return (
    <div className={styles.list}>
      {props.list.map((item, index) => {
        return (
          <ul key={index}>
            <li>
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
