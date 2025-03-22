import { Link } from "react-router-dom";
import styles from "./style.module.css";
export const Header = () => {
  return (
    <div className={styles.headerSpace}>
      <div className={styles.headerBlock}>
        <Link to="/">
          <div className={styles.buttonBlock}>
            <img
              className={styles.icon}
              alt="options"
              src="/images/Header/Options.svg"
            />
          </div>
        </Link>
        <Link to="/createtask">
          <div className={styles.buttonBlock}>
            <img
              className={styles.icon}
              alt="options"
              src="/images/Header/Plus.svg"
            />
          </div>
        </Link>
        <Link to="/aihelper">
          <div className={styles.buttonBlock}>
            <img
              className={styles.icon}
              alt="options"
              src="/images/Header/Laptop.svg"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
