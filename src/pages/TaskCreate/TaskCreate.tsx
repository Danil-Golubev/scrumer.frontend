import { motion } from "framer-motion";
import { Header } from "../../components/Header/Header";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { SkeletonBlock } from "../SkeletonBlock/SkeletonBlock";
import { Employee, TaskType } from "../../types";
import { fetchCreateTask } from "../../redux/task";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import { Navigate } from "react-router-dom";

type props = {
  team: string;
  title: string;
  status: string;
  description: string;
  performer: string | Employee;
  deadline: Date;
};
export const TaskCreate = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      team: "",
      title: "",
      description: "",
      performer: {} as Employee,
      status: "open",
      deadline: new Date(),
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const [isCreated, setIsCreated] = useState(false);

  const onSubmit = async (value: props) => {
    const employee = JSON.parse(value.performer as string);

    const data = {
      team: user.team._id,
      title: value.title,
      // status: value.status,
      description: value.description,
      performer: {
        user: employee.user._id,
        position: "admin",
      } as Employee,
      deadline: new Date(value.deadline),
    };
    console.log("data:", data);
    const task = await dispatch(fetchCreateTask(data as unknown as TaskType));
    if (task) {
      setIsCreated(true);
    }
  };

  if (isCreated) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <SkeletonBlock />;
  }

  return (
    <>
      <Header />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <form className={styles.mainBlock} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Создание задачи</p>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <input
                {...register("title", { required: "Укажи название" })}
                className={styles.customInput}
                type="text"
                placeholder="Введите название задачи"
              />
              <textarea
                {...register("description", { required: "Укажи описание" })}
                placeholder="Введите описание задачи"
                rows={4}
                cols={40}
              ></textarea>
            </div>
            <div className={styles.block}>
              <div className={styles.rows}>
                <div className={styles.infoRow}>
                  <p>
                    <strong>Исполнитель:</strong>
                    <select
                      {...register("performer", {
                        required: "Укажи исполнителя",
                      })}
                    >
                      {user?.team?.members.map((member: Employee) => (
                        <option
                          key={member.user._id}
                          value={JSON.stringify(member)}
                        >
                          {member.user.firstName} {member.user.lastName[0]}
                        </option>
                      ))}
                    </select>
                  </p>
                </div>
                <div className={styles.infoRow}>
                  <p>
                    <strong>Статус:</strong> 123
                  </p>
                </div>
                <div className={styles.infoRow}>
                  <p>
                    <strong>Дедлайн:</strong>
                    <input
                      {...register("deadline", {
                        required: "Укажи дедлайн",
                      })}
                      className={styles.dateInput}
                      type="date"
                    ></input>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Создать задачу</button>
        </form>
      </motion.div>
    </>
  );
};
