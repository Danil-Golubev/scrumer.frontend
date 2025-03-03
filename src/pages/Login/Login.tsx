import { Link, Navigate } from "react-router-dom";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from "../../redux/auth";
import { LoginParams, User } from "../../types";
import { useAppDispatch } from "../../redux/store";
import { motion } from "framer-motion";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const onSubmit = async (value: LoginParams) => {
    const data = await dispatch(fetchLogin(value));
    const payload = data.payload as { token?: string };
    console.log(payload);
    if (payload && payload.token) {
      window.localStorage.setItem("token", payload.token);
    } else {
      alert("Ошибка авторизации");
    }
  };

  if (isAuth) {
    return <Navigate to="/createorjoin" />;
  }

  return (
    <div className={styles.content}>
      <motion.div
        className={styles.block}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p className={styles.title}>
          <span style={{ color: "var(--primary-color)" }}>Привет</span>, войди
          или <br />
          зарегистрируйся
        </p>

        <form className={styles.inputsBlock} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBlock}>
            <input
              type="email"
              placeholder="Введите email"
              {...register("email", { required: "Укажите почту" })}
            />
            <p className={styles.error}>
              {errors.email ? errors.email.message : "\u00A0"}
            </p>
          </div>
          <div className={styles.inputBlock}>
            <input
              type="password"
              placeholder="Введите пароль"
              {...register("password", { required: "Укажите пароль" })}
            />
            <p className={styles.error}>
              {errors.password ? errors.password.message : "\u00A0"}
            </p>
          </div>
          <button type="submit" className={styles.buttonCustom}>
            Войти
          </button>
        </form>

        <Link className={styles.linkText} to="/register">
          У меня нет аккаунта
        </Link>
      </motion.div>
    </div>
  );
};
