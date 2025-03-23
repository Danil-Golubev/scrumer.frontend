import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { motion } from "framer-motion";
export const Join = () => {
  const { register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  // const handleSubmit = () => {
  //   console.log(123);
  // };
  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.block}>
        <p className={styles.title}>Вход в команду</p>

        <form className={styles.inputsBlock}>
          <div className={styles.inputBlock}>
            <input
              type="password"
              placeholder="Введите код команды"
              {...register("password", { required: "Укажите код" })}
            />
          </div>
          <button type="submit" className={styles.buttonCustom}>
            Присоединиться
          </button>
        </form>
      </div>
    </motion.div>
  );
};
