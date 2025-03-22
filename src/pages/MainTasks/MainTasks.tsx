import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Column } from "./Column";
import styles from "./style.module.css";
import { fetchAuthMe, selectUser } from "../../redux/auth";
import { Navigate } from "react-router-dom";
import { SkeletonBlock } from "../SkeletonBlock/SkeletonBlock";
import { Header } from "../../components/Header/Header";
import { motion } from "framer-motion";
import { TaskType } from "../../types";
import { Task } from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { fetchTaskStatusChange } from "../../redux/api";
import { TaskModal } from "../../components/TaskModal/TaskModal";
import { useAppDispatch } from "../../redux/store";

export const MainTasks = () => {
  const user = useSelector(selectUser);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskType>({} as TaskType);
  const dispatch = useAppDispatch();
  // Используем ref для хранения исходного состояния задач перед перетаскиванием
  const originalTasksRef = useRef<TaskType[]>([]);

  useEffect(() => {
    if (user && user.team) {
      setTasks([...user.team.tasks]);
    }
  }, [user]);

  // Если пользователь не авторизован или нет команды
  if (!user) {
    return <SkeletonBlock />;
  }

  // Если нет команды, перенаправляем
  if (!user.team) {
    return <Navigate to="/createorjoin" />;
  }

  // Функция для фильтрации задач по статусу
  const filterTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  // Обработчик начала перетаскивания
  const onDragStart = (start: any) => {
    // Сохраняем ID перетаскиваемой задачи
    setDraggingId(start.draggableId);

    // Сохраняем исходное состояние задач
    originalTasksRef.current = [...tasks];

    // Добавляем класс к body для глобальных стилей во время перетаскивания
    document.body.classList.add("dragging-in-progress");
  };

  // Обработчик завершения перетаскивания
  const onDragEnd = (result: DropResult) => {
    // Очищаем ID перетаскиваемой задачи
    setDraggingId(null);

    // Удаляем класс с body
    document.body.classList.remove("dragging-in-progress");

    const { destination, source } = result;

    // Если элемент был перетащен за пределы допустимой области или не было изменения
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Используем исходное состояние задач перед перетаскиванием
    const sourceTasksList = originalTasksRef.current.filter(
      (task) => task.status === source.droppableId
    );

    // Получаем задачу, которую перетащили
    const movedTask = sourceTasksList[source.index];

    // Создаем новый массив задач
    const newTasks = tasks.map((task) => {
      // Если это задача, которую мы перетаскиваем
      if (task._id === movedTask._id) {
        // Обновляем её статус на статус целевой колонки
        return {
          ...task,
          status: destination.droppableId,
        };
      }
      return task;
    });

    // Обновляем состояние
    setTasks(newTasks);

    fetchTaskStatusChange(movedTask._id as string, destination.droppableId);

    console.log(
      `Задача ${movedTask.title} перемещена из ${source.droppableId} в ${destination.droppableId}`
    );
  };

  // Данные о колонках для более чистого рендеринга
  const columns = [
    { id: "open", title: "Открыта" },
    { id: "in_progress", title: "В процессе" },
    { id: "closed", title: "Закрыто" },
    { id: "postponed", title: "Отложена" },
  ];

  const openModal = (task: TaskType) => {
    setIsModalOpen(true);
    setSelectedTask(task);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(fetchAuthMe()); // Обновляем данные в Redux
  };

  return (
    <>
      <Header />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <TaskModal
          task={selectedTask}
          onClose={closeModal}
          isOpen={isModalOpen}
        ></TaskModal>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className={styles.columns}>
            {columns.map((column) => (
              <div key={column.id} className={styles.column}>
                <Droppable droppableId={column.id}>
                  {(provided: DroppableProvided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`${
                        snapshot.isDraggingOver ? styles.isDraggingOver : ""
                      }`}
                    >
                      <Column title={column.title}>
                        <div className={styles.columnBlock}>
                          {filterTasksByStatus(column.id).map((task, index) => (
                            <Draggable
                              key={String(task._id)}
                              draggableId={String(task._id)}
                              index={index}
                            >
                              {(provided: DraggableProvided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${
                                    snapshot.isDragging ? styles.dragging : ""
                                  } ${
                                    draggingId &&
                                    draggingId !== String(task._id)
                                      ? styles.notBeingDragged
                                      : ""
                                  }`}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                  onClick={() => openModal(task)}
                                >
                                  <Task
                                    key={task._id}
                                    firstName={task.performer.user.firstName}
                                    lastName={task.performer.user.lastName}
                                    deadline={task.deadline}
                                    taskTitle={task.title}
                                    isDragging={snapshot.isDragging}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      </Column>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
        <div className={styles.backlogMainBlock}>
          <p>Бэклог</p>
          <div className={styles.backlogBlock}></div>
        </div>
      </motion.div>
    </>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
