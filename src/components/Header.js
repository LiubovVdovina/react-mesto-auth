import logoPath from '../images/logo.svg';

function Header({loggedIn, isLoginPage}) {
  return(
    <header className="header">
      <img className="logo" src={logoPath} alt="логотип Место" /> 
      <div className='header__right-block'>
        {loggedIn && <p className='header__email'>someemail@yandex.ru</p>}
        <button className="header__link">{loggedIn ? "Выйти" : isLoginPage ? "Регистрация" : "Войти"} </button>
      </div>
    </header>
  );
}

export default Header;