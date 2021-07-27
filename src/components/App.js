import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isVerifyPopupOpen, setVerifyPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
    .then((info) => {
      setCurrentUser(info);
    })
    .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser({name, about}) {
    setLoading(true);
    api.setUserProfileInfo({name, about})
    .then((editedInfo) => {
      setCurrentUser(editedInfo);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeAllPopups();
      setLoading(false);
    });
  }

  function handleUpdateAvatar({avatar}) {
    setLoading(true);
    api.setProfileAvatar({avatar})
    .then((editedInfo) => {
      setCurrentUser(editedInfo);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeAllPopups();
      setLoading(false);
    })
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setVerifyPopupOpen(false);
  }

  function handleRemoveCardClick() {
    setVerifyPopupOpen(true);
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onRemoveBtnClick={handleRemoveCardClick}
        />
        <Footer/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <PopupWithForm 
          name="add-card" 
          title="New place" 
          buttonLabel="Create"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__label">
            <input type="text" className="form__item form__item_el_card-title" id="card-title-input" name="name" placeholder="Title" maxLength="30" required/>
            <span className="form__input-error card-title-input-error"></span>
          </label>
          <label className="form__label">
            <input type="url" className="form__item form__item_el_card-link" id="card-link-input" name="link" placeholder="Image URL" required/>
            <span className="form__input-error card-link-input-error"></span>
          </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <PopupWithForm 
          name="remove-verify" 
          title="Are you sure?" 
          buttonLabel="Yes"
          isOpen={isVerifyPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
