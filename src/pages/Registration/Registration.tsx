import { Link, Navigate } from "react-router-dom";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/auth";
import { LoginParams } from "../../types";
import { useAppDispatch } from "../../redux/store";
export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const onSubmit = async (value: LoginParams) => {
    const data = await dispatch(fetchRegister(value));
    const payload = data.payload as { token?: string };
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
      <div className={styles.block}>
        <p className={styles.title}>
          <span style={{ color: "var(--primary-color)" }}>Регистрация</span>
        </p>

        <form className={styles.inputsBlock} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBlock}>
            <input
              type="firstName"
              placeholder="Введи имя"
              {...register("firstName", { required: "Укажи имя" })}
            />
            <p className={styles.error}>
              {errors.firstName ? errors.firstName.message : "\u00A0"}
            </p>
          </div>
          <div className={styles.inputBlock}>
            <input
              type="lastName"
              placeholder="Введи фамилию"
              {...register("lastName", { required: "Укажи фамилию" })}
            />
            <p className={styles.error}>
              {errors.lastName ? errors.lastName.message : "\u00A0"}
            </p>
          </div>
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
          <button
            disabled={!isValid}
            type="submit"
            className={styles.buttonCustom}
          >
            Зарегестрироваться
          </button>
        </form>

        <Link className={styles.linkText} to="/login">
          У меня есть аккаунт
        </Link>
      </div>
    </div>
  );
};
