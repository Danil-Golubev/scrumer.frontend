import { useSelector } from "react-redux";
import { Column } from "./Column";
import styles from "./style.module.css";
import { selectUser } from "../../redux/auth";
import { Navigate } from "react-router-dom";
import { SkeletonBlock } from "../SkeletonBlock/SkeletonBlock";
import { useEffect } from "react";
export const MainTasks = () => {
  const user = useSelector(selectUser);
  // if (!user) {
  //   return <SkeletonBlock />;
  // }

  useEffect(() => {}, []);

  if (!user.team) {
    return <Navigate to="/createorjoin" />;
  }
  return (
    <>
      <div className={styles.columns}>
        <Column title="Открыта" />
        <Column title="В процессе" />
        <Column title="Закрыто" />
        <Column title="Отложена" />
      </div>
      <div className={styles.backlogMainBlock}>
        <p>Бэклог</p>
        <div className={styles.backlogBlock}></div>
      </div>
    </>
  );
};
