function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
   <li className="card">
      <button className={`card__remove-btn ${props.card.owner._id === props.userId ? 'card__remove-btn_visible': ''} hover-effect`} onClick={props.onRemoveBtnClick} aria-label="Remove" type="button"></button>
      <div className="card__image" onClick={handleClick} style={{backgroundImage: `url(${props.card.link})`}}></div>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className="card__like-btn like-hover" aria-label="Like" type="button"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;