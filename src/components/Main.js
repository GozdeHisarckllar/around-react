import { useContext } from 'react';
//import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  /*const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [userId, setUserId] = useState();*/
  //const [cards, setCards] = useState([]);

  /*useEffect(() => {
    api.getUserInfo()
    .then((info) => { 
      setUserName(info.name);
      setUserDescription(info.about);
      setUserAvatar(info.avatar);
      setUserId(info._id);
    })
    .catch((err) => console.log(err));
  }, []);*/
  /*function handleCardLike(card) {
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
    api.removeCard(card._id)
    .then(() => {
      setCards(cards.filter((initialCard) => {
        return initialCard._id !== card._id;
      }))
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    api.getInitialCards()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  }, []);*/

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-picture" style={{backgroundImage: `url(${currentUser.avatar})`}}>
          <button onClick={props.onEditAvatarClick} className="profile__button profile__button_type_avatar hover-effect" aria-label="Change avatar" type="button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title-name">{currentUser.name}</h1>
          <button onClick={props.onEditProfileClick} className="profile__button profile__button_type_edit hover-effect" aria-label="Edit" type="button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlaceClick} className="profile__button profile__button_type_add hover-effect" aria-label="Add" type="button"></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} userId={currentUser._id} onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} /*onCardDelete={props.onCardDelete}*/ onRemoveBtnClick={props.onRemoveBtnClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;