import { Link } from "react-router-dom";

function Register() {
  return(
    <form className="auth-form">
      <h2 className="auth-form__title">Регистрация</h2>
      <input 
        className="auth-form__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />
      <input 
        className="auth-form__input"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <button className="auth-form__button">Зарегистрироваться</button>
      <p className="auth-form__registered">
        <Link className="auth-form__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </p>
    </form>
  );
}

export default Register;