import React from 'react';
import styles from './search.module.scss';
import { BiSearch } from 'react-icons/bi';

interface propTypes {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search = ({ value, onChange }: propTypes) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />

      <input
        type='text'
        placeholder='Search by name'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
