import React from 'react'
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth'

function Login({loggedIn, handleLogin}) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if(data.token) {
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    if(loggedIn) {
    navigate('/', {replace: true})}
  }, [loggedIn])

  return(
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Вход</h2>
      <input 
        className="auth-form__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange}
      />
      <input 
        className="auth-form__input"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange}
      />
      <button className="auth-form__button">Войти</button>
    </form>
  );
}

export default Login;