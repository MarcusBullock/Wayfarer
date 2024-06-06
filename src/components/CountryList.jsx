import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../context/CitiesContext";

function CountryList() {
    const { isLoading, cities } = useCities();
    const countries = cities
        .reduce((arr, city) => {
            if (!arr.map((el) => el.country).includes(city.country))
                return [...arr, { country: city.country, emoji: city.emoji }];
            else return arr;
        }, [])
        .sort((x, y) => x.country.localeCompare(y.country));

    if (isLoading) return <Spinner />;

    if (!countries.length)
        return (
            <Message message="Add your first country by clicking on a country on the map" />
        );

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}

export default CountryList;
