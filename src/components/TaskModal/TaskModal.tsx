import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Employee, TaskType } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { motion } from "framer-motion";
import { fetchTaskDelete, fetchTaskUpdate } from "../../redux/api";

type props = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskType;
};

export type SubmitHandlerType = {
  _id?: string;
  team: string | undefined;
  title: string;
  description: string;
  performer: string | undefined;
  status: string;
  deadline: string;
};

export const TaskModal = ({ isOpen, onClose, task }: props) => {
  const formattedDate = String(task.deadline).split("T")[0];

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      team: task.team,
      title: task.title,
      description: task.description,
      performer: task.performer?.user?._id, // Используем опциональную цепочку для проверки
      status: task.status,
      deadline: formattedDate,
    },
    mode: "onChange",
  });

  // const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  // const [isCreated, setIsCreated] = useState(false);

  const [initialValues, setInitialValues] = useState<SubmitHandlerType>({
    team: task.team,
    title: task.title,
    description: task.description,
    performer: task.performer?.user?._id,
    status: task.status,
    deadline: formattedDate,
  });

  // Обновление значений в форме при изменении task
  useEffect(() => {
    if (task.performer?.user?._id) {
      setValue("performer", task.performer.user._id); // Устанавливаем ID исполнителя
    }
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("deadline", formattedDate); // Обновляем дедлайн

    // Update the initial values
    setInitialValues({
      team: task.team,
      title: task.title,
      description: task.description,
      performer: task.performer?.user?._id,
      status: task.status,
      deadline: formattedDate,
    });
  }, [task, formattedDate, setValue]);

  const onSubmit: SubmitHandler<SubmitHandlerType> = async (
    data: SubmitHandlerType
  ) => {
    // Преобразуем строковый дедлайн в объект Date
    const deadlineDate = new Date(data.deadline);

    // Находим объект исполнителя по его ID
    const selectedPerformer = user?.team?.members.find(
      (member: { user: { _id: string | undefined } }) =>
        member.user._id === data.performer // Сравниваем по ID
    );

    // Если исполнителя не нашли, можно обработать ошибку
    if (!selectedPerformer) {
      console.error("Исполнитель не найден");
      return;
    }

    const taskData: TaskType = {
      _id: task._id,
      team: data.team,
      title: data.title,
      status: data.status,
      description: data.description,
      performer: selectedPerformer, // Передаем объект Employee
      deadline: deadlineDate, // Передаем Date
    };
    fetchTaskUpdate(taskData);
    handleClose();
    console.log("taskData:", taskData);
    // const task = await dispatch(fetchCreateTask(taskData as TaskType));

    // if (task) {
    //   setIsCreated(true);
    // }
  };

  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const isFormChanged = () => {
    const currentValues = watch();
    return (
      currentValues.title !== initialValues.title ||
      currentValues.description !== initialValues.description ||
      currentValues.performer !== initialValues.performer ||
      currentValues.status !== initialValues.status ||
      currentValues.deadline !== initialValues.deadline
    );
  };

  const handleDeleteTask = () => {
    fetchTaskDelete(task._id as string);
    handleClose();
  };

  if (!isVisible) return null;

  if (!isOpen) return null;

  return (
    <div className={styles.screen}>
      <div className={styles.backgroundScreen} onClick={handleClose}></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={styles.modalBlock}
      >
        <div className={styles.content}>
          <form className={styles.mainBlock} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modalHedaer}>
              <p className={styles.title}>Задача {task.title}</p>
              <img
                onClick={handleClose}
                alt="cross"
                src="/images/cross3.svg"
                className={styles.cross}
              />
            </div>
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
                          <option key={member.user._id} value={member.user._id}>
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
            <div className={styles.modalFooter}>
              <button type="submit" disabled={!isFormChanged()}>
                Сохранить изменения
              </button>
              <button
                onClick={() => handleDeleteTask()}
                className={styles.deleteButton}
              >
                Удалить задачу
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
