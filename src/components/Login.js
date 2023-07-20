function Login() {
  return(
    <form className="auth-form">
      <h2 className="auth-form__title">Вход</h2>
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
      <button className="auth-form__button">Войти</button>
    </form>
  );
}

export default Login;