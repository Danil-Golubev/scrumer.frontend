import styles from "./style.module.css";

export const SkeletonBlock = () => {
  return (
    <div className={`${styles.content} ${styles.skeletonWrapper}`}>
      <div className={styles.block}>
        <div className={`${styles.blockContent} ${styles.skeleton}`}>
          <div className={styles.loader}></div>
        </div>
      </div>
    </div>
  );
};
