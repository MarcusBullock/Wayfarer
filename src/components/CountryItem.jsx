import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>
        {country.country === "United States of America (the)"
          ? "USA"
          : country.country ===
            "United Kingdom of Great Britain and Northern Ireland (the)"
          ? "UK"
          : country.country}
      </span>
    </li>
  );
}

export default CountryItem;
