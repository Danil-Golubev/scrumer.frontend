import { motion } from "framer-motion";
import styles from "./style.module.css";
export const TeamCreating = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.content}
    >
      <div className={styles.block}>
        <div className={styles.blockContent}>
          <p className={styles.title}>Создане команды</p>
          <p className={styles.number}>1.</p>
          <p className={styles.text}>
            Привет, для начала введи название проекта над которым будет работать
            команда. Важно указывать четкое название, так наши алгоритмы будут
            работать эффективнее.
          </p>

          <input />
          <p className={styles.number}>2.</p>
          <p className={styles.text}>
            Теперь укажи подробное описание проекта: для чего он нужен, какие у
            него особенности, кому он поможет и т.д.
          </p>
          <input />
          <p className={styles.number}>3.</p>
          <p className={styles.text}>
            Укажи точное время за сколько нужно завершить проект
          </p>
          <input />
          <p className={styles.number}>4.</p>
          <p className={styles.text}>
            Укажи точное время за сколько нужно завершить проект
          </p>
          <div className={styles.buttonMonth}>
            <div className={styles.buttonMonthNumber}></div>
            <div className={styles.divider} />
            <p className={styles.buttonMonthText}>Месяц(а/ев)</p>
          </div>
          <p className={styles.number}>5.</p>
          <p className={styles.text}>Укажи сколько будет длиться один спринт</p>
          <div className={styles.buttonMonth}>
            <div className={styles.buttonMonthNumber}></div>
            <div className={styles.divider} />
            <p className={styles.buttonMonthText}>Недели</p>
          </div>
          <button>Создать командуу</button>
        </div>
      </div>
    </motion.div>
  );
};
