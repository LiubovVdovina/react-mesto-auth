import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import {api} from '../utils/Api'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoginPage, setIsLoginPage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({}); // переменная состояния, хранящая данные текущего пользователя

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards)
      })
      .catch((err) => console.log(err))
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({});
  }


  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {

    api.removeCard(card._id)
    .then(() => setCards((state) => state.filter((c)=> c._id !== card._id)))
    .catch((err) => console.log(err))
  }

  function handleUpdateUser(newUserInfo) {
    api.sendUserInfo(newUserInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  
  function handleUpdateAvatar(newAvatar) {
    api.sendAvatarInfo(newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  
  function handleAddPlace(newPlace) {
    api.sendCardInfo(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  const loggedIn = true;
  return(
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} isLoginPage={isLoginPage}/>
      <Routes>
        
      <Route path="/" element=
        {<ProtectedRoute 
          element ={Main}
          loggedIn = {loggedIn}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete} 
          cards={cards} />} />
        <Route path="/sign-up" element={<Register />}/>
        <Route path="/sign-in" element={<Login />}/>
      </Routes>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <PopupWithForm title='Вы уверены' name='remove' buttonText='Да'>  </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip isSuccess={true} isOpen={false} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  );
}

export default App;
