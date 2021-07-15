import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    api.getUserInfo()
    .then((info) => { 
      setUserName(info.name);
      setUserDescription(info.about);
      setUserAvatar(info.avatar);
      setUserId(info._id);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getInitialCards()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-picture" style={{backgroundImage: `url(${userAvatar})`}}>
          <button onClick={props.onEditAvatarClick} className="profile__button profile__button_type_avatar hover-effect" aria-label="Change avatar" type="button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title-name">{userName}</h1>
          <button onClick={props.onEditProfileClick} className="profile__button profile__button_type_edit hover-effect" aria-label="Edit" type="button"></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button onClick={props.onAddPlaceClick} className="profile__button profile__button_type_add hover-effect" aria-label="Add" type="button"></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} userId={userId} onCardClick={props.onCardClick} onRemoveBtnClick={props.onRemoveBtnClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;