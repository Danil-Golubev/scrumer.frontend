import { ReactNode } from "react";
import styles from "./style.module.css";

interface props {
  title: string;
  children: ReactNode;
}

export const Column = ({ title, children }: props) => {
  return (
    <div className={styles.mainColumnBlock}>
      <p>{title}</p>
      <div className={styles.columnBlock}>
        {Boolean(children) ? children : <p className={styles.empty}>Пусто</p>}
      </div>
    </div>
  );
};
