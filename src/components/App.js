import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isVerifyPopupOpen, setVerifyPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);/*''*/

  function handleEditProfileClick() {
    setEditProfileOpen(true);/*!isEditProfilePopupOpen*/
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleCardClick(clickedCard) {/*card=>onCardClick={handleCardClick} imagepopup=>isImageOpen={isImagePopupOpen}*/
    setSelectedCard(clickedCard);
    setImagePopupOpen(true);
  }/*if popups wouldn't be hidden =>in handles, useState(false) states change with setTrue function => {isTrue && <PopupWithForm/>}*/
/*inside popupwithform onclick={props.onClose}  <PopupWithForm onClose={closeAllPopups}=>const isClosed = useState(false) =>closePopups(){setClose(true)}*/
  function closeAllPopups() {
    setEditProfileOpen(false);/*!isPopupClosed*/
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setImagePopupOpen(false);
    //setSelectedCard('');
    setVerifyPopupOpen(false);
  }/*selectedCard && <imagePopup..>  | setSelectedCard(true/'')=>{selectedCard?modal_opened}
selectedCard? props.card.name}*/
  function handleRemoveCardClick() {/*Card component*/
    setVerifyPopupOpen(true);
  }
  return (
    <div className="page__container">
      <Header/>
      <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={(card) => handleCardClick(card)}
        onRemoveBtnClick={handleRemoveCardClick}
      />
      <Footer/>
      <PopupWithForm 
        name="edit-profile" 
        title="Edit profile" 
        buttonLabel="Save"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label">
          <input type="text" className="form__item form__item_el_name" id="name-input" name="name" placeholder="Name" minLength="2" maxLength="40" required/>
          <span className="form__input-error name-input-error"></span>
        </label>
        <label className="form__label">
          <input type="text" className="form__item form__item_el_subtitle" id="subtitle-input" name="about" placeholder="About me" minLength="2" maxLength="200" required/>
          <span className="form__input-error subtitle-input-error"></span>
        </label>
      </PopupWithForm>
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
      <PopupWithForm 
        name="change-avatar" 
        title="Change profile picture" 
        buttonLabel="Save"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label">
          <input type="url" className="form__item form__item_el_avatar-link" id="avatar-link-input" name="avatar" placeholder="Picture URL" required/>
          <span className="form__input-error avatar-link-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm 
        name="remove-verify" 
        title="Are you sure?" 
        buttonLabel="Yes"
        isOpen={isVerifyPopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;