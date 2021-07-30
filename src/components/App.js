import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

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

  function handleAddPlaceSubmit({name, link}) {
    setLoading(true);
    api.addNewCard({name, link})
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeAllPopups();
      setLoading(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((likeInfo) => {
      return likeInfo._id === currentUser._id;
    });

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((updatedCard) => {
      setCards(cards.map((initialCard) => {
        return initialCard._id === card._id ? updatedCard : initialCard
      }));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setLoading(true);
    api.removeCard(card._id)
    .then(() => {
      setCards(cards.filter((initialCard) => {
        return initialCard._id !== card._id;
      }))
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeAllPopups();
      setLoading(false);
    })
  }

  useEffect(() => {
    api.getInitialCards()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  }, []);

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
    setConfirmationPopupOpen(false);
  }

  function handleRemoveCardClick(card) {
    setConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          cards={cards}
          onCardLike={handleCardLike}
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
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
