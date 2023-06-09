import styles from "./style.module.css";
import {ChangeEvent, FormEvent} from "react";

interface ISearchForm {
  search: (e:FormEvent<HTMLFormElement>) => void;
  query: string;
  changeInput: (e:  ChangeEvent<HTMLInputElement>) => void;
  disabledBtn: boolean;
}

export const SearchForm = ({
  search,
  query,
  changeInput,
  disabledBtn,
}: ISearchForm) => {
  return (
    <form className={styles.form} onSubmit={search}>
      <label htmlFor="input" className={styles.label}>
        Введите название города
      </label>
      <input
        type="text"
        id="input"
        value={query}
        className={styles.input}
        onChange={changeInput}
      />
      <button type="submit" className={styles.button} disabled={disabledBtn}>
        найти
      </button>
    </form>
  );
};