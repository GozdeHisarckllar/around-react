function Card(props) {
  const isOwn = props.card.owner._id === props.userId;
  
  const isLiked = props.card.likes.some((likeInfo) => {
    return likeInfo._id === props.userId;
  })

  const cardLikeBtnClassName = 'card__like-btn_active';

  function handleClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  /*function handleDeleteClick() {
    props.onCardDelete(props.card);
  }*/
  
  function handleDeleteClick() {
    props.onRemoveBtnClick(props.card);
  }
  return (
   <li className="card">
      <button className={`card__remove-btn ${isOwn ? 'card__remove-btn_visible': ''} hover-effect`} onClick={() => {handleDeleteClick();/*props.onRemoveBtnClick(); handleDeleteClick();*/}} aria-label="Remove" type="button"></button>
      <div className="card__image" onClick={handleClick} style={{backgroundImage: `url(${props.card.link})`}}></div>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className={`card__like-btn like-hover ${isLiked ? cardLikeBtnClassName : ''}`} onClick={handleLikeClick} aria-label="Like" type="button"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;