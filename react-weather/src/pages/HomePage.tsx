import {ChangeEvent, FormEvent, SetStateAction, useState} from "react";
import styles from "./style.module.css";
import { ResponseCityApi, searchCityApi } from "../api/searchCity";
import { Link } from "react-router-dom";
import { SearchForm } from "../components/search-form/SearchForm";
import {CityList} from "../components/city-list/CityList";

export const HomePage = () => {
  const [query, setQuery] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [cities, setSites] = useState<ResponseCityApi[]>([]);

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 3) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }

  async function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSites([]);
      const cities = await searchCityApi(query);
      setSites(cities);
    } catch (e) {
      console.log(e.measage);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div>
        <SearchForm
          search={search}
          changeInput={changeInput}
          disabledBtn={disabledBtn}
          query={query}
        />
      </div>
      {cities.length ? <CityList cities={cities} /> : <></>}
    </div>
  );
};