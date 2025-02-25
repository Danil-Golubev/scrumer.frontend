import styles from "./style.module.css";

interface props {
  title: string;
}

export const Column = ({ title }: props) => {
  return (
    <div className={styles.mainColumnBlock}>
      <p>{title}</p>
      <div className={styles.columnBlock}></div>
    </div>
  );
};
