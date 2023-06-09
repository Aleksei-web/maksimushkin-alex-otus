import { Link } from "react-router-dom";
import styles from "../../pages/style.module.css";

interface ICity {
  name: string;
  id: number;
  lat: number;
  lon: number;
  country: string;
  region: string;
}

interface ICityList {
  cities: ICity[];
}

export const CityList = ({ cities }: ICityList) => {
  return (
    <>
      {cities.length && (
        <ul>
          {cities.map((el) => (
            <Link key={el.id} to={`/${el.name}?coords=${el.lat},${el.lon}`}>
              {" "}
              <li className={styles.city}>
                {el.country} / {el.region} / {el.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};
