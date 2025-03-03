import { motion } from "framer-motion";
import { Header } from "../../components/Header/Header";
import styles from "./style.module.css";
export const TaskCreate = () => {
  return (
    <>
      <Header />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className={styles.mainBlock}>
          <p className={styles.title}>Создание задачи</p>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <input
                className={styles.customInput}
                type="text"
                placeholder="Введите название"
              />
              <textarea
                placeholder="Введите описание"
                rows={4}
                cols={40}
              ></textarea>
            </div>
            <div className={styles.block}></div>
          </div>
          <button>Создать задачу</button>
        </div>
      </motion.div>
    </>
  );
};
