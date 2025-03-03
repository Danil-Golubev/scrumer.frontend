import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { selectUser } from "../../redux/auth";
import { SkeletonBlock } from "../SkeletonBlock/SkeletonBlock";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
export const CreateOrJoin = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <SkeletonBlock />;
  }

  if (user.team) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.block}>
        <div className={styles.blockContent}>
          <p className={styles.title}>
            <span style={{ color: "var(--primary-color)" }}>
              Добро пожаловать
            </span>
            , {user.firstName}! <br />
            Присоединись или создай <br />
            свою команду
          </p>
          <Link to="/teamcreating">
            <motion.div
              className={styles.semiBlock}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={styles.logoBlock}>
                <img
                  alt="cross"
                  className={styles.logoSvg}
                  src="/images/cross2.svg"
                />
              </div>
              <div className={styles.divider} />
              <div className={styles.textBlock}>
                <p className={styles.textContent}>Создать команду</p>
              </div>
            </motion.div>
          </Link>
          <Link to="/join">
            <motion.div
              className={styles.semiBlock}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles.logoBlock}>
                <img
                  alt="cross"
                  className={styles.logoSvg}
                  src="/images/invite.svg"
                />
              </div>
              <div className={styles.divider} />
              <div className={styles.textBlock}>
                <p className={styles.textContent}>
                  Вступить в<br></br> команду
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
