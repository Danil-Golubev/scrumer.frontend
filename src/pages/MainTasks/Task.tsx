import styles from "./style.module.css";
type props = {
  firstName: string;
  lastName: string;
  deadline: Date;
  taskTitle: string;
  isDragging?: boolean;
};
export const Task = ({
  firstName,
  lastName,
  deadline,
  taskTitle,
  isDragging,
}: props) => {
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      })
    : "";
  return (
    <div
      className={`${styles.taskBlock} ${isDragging ? styles.taskDragging : ""}`}
    >
      <div className={styles.taskContent}>
        <div className={styles.performer}>
          <div className={styles.avatar}></div>
          <p className={styles.performerName}>
            {firstName} {lastName[0]}.
          </p>
          <div className={styles.deadline}>До {formattedDeadline}</div>
        </div>
        <div className={styles.taskTitle}>{taskTitle}</div>
      </div>
    </div>
  );
};
