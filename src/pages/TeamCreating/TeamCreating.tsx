import { motion } from "framer-motion";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import { Team } from "../../types";
import { useAppDispatch } from "../../redux/store";
import { fetchCreateTeam } from "../../redux/team";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
export const TeamCreating = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      sprintDuration: "",
    },
    mode: "onChange",
  });
  const [flag, setFlag] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const onSubmit = async (value: Team) => {
    const data = await dispatch(fetchCreateTeam(value));
    if (data) {
      setFlag(true);
    }
  };

  if (user.team || flag) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.content}
    >
      <form className={styles.inputsBlock} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <div className={styles.blockContent}>
            <p className={styles.title}>Создане команды</p>
            <p className={styles.number}>1.</p>
            <p className={styles.text}>
              Привет, для начала введи название проекта над которым будет
              работать команда. Важно указывать четкое название, так наши
              алгоритмы будут работать эффективнее.
            </p>

            <input
              type="title"
              placeholder="Введи название"
              {...register("title", { required: "Укажи название" })}
            />
            <p className={styles.number}>2.</p>
            <p className={styles.text}>
              Теперь укажи подробное описание проекта: для чего он нужен, какие
              у него особенности, кому он поможет и т.д.
            </p>
            <input
              type="description"
              placeholder="Введи описание"
              {...register("description", { required: "Укажи описание" })}
            />
            <p className={styles.number}>3.</p>
            <p className={styles.text}>
              Укажи точное время за сколько нужно завершить проект
            </p>

            <div className={styles.buttonMonth}>
              <div className={styles.buttonMonthNumber}>
                <input
                  className={styles.customInput}
                  type="date"
                  {...register("deadline", {
                    required: "Укажи за сколько нужно заверишть проект",
                  })}
                />
              </div>
              <div className={styles.divider} />
              <p className={styles.buttonMonthText}>Месяц(а/ев)</p>
            </div>
            <p className={styles.number}>4.</p>
            <p className={styles.text}>
              Укажи сколько будет длиться один спринт
            </p>
            <div className={styles.buttonMonth}>
              <div className={styles.buttonMonthNumber}>
                <input
                  className={styles.customInput}
                  type="number"
                  {...register("sprintDuration", {
                    required: "Укажи за сколько нужно заверишть проект",
                  })}
                />
              </div>
              <div className={styles.divider} />
              <p className={styles.buttonMonthText}>Недели</p>
            </div>
            <button type="submit">Создать командуу</button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
