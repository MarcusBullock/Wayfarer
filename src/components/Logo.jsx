import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" style={{ textDecoration: "none", width: "300px" }}>
      <div className={styles.wrap}>
        <img src="/logo-test.png" alt="Wayfarer logo" className={styles.logo} />
        <span className={styles.logoText}>Wayfarer</span>
      </div>
    </Link>
  );
}

export default Logo;
