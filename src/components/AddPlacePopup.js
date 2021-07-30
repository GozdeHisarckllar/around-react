import { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { handleValidation } from '../utils/utils';
import { inputElementErrorClassName, errorClassName} from '../utils/constants';


function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const nameInputElement = useRef();
  const linkInputElement = useRef();

  const[isNameValid, setNameValid] = useState(true);
  const[isLinkValid, setLinkValid] = useState(true);
  const[nameErrorMessage, setNameErrorMessage] = useState('');
  const[linkErrorMessage, setLinkErrorMessage] = useState('');
  const[isButtonDisabled, setButtonDisabled] = useState(true);

  function handleNameChange() {
    handleValidation(
      nameInputElement,
      linkInputElement,
      setNameValid, 
      setNameErrorMessage,
      setButtonDisabled
    );
  }

  function handleLinkChange() {
    handleValidation(
      linkInputElement,
      nameInputElement,
      setLinkValid, 
      setLinkErrorMessage,
      setButtonDisabled
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: nameInputElement.current.value, 
      link: linkInputElement.current.value
    });
  }

  return(
    <PopupWithForm 
      name="add-card" 
      title="New place" 
      buttonLabel="Create"
      loadingButtonLabel='Creating...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonDisabled={isButtonDisabled}
    >
      <label className="form__label">
        <input type="text" ref={nameInputElement} className={`form__item form__item_el_card-title ${!isNameValid? inputElementErrorClassName:''}`}
          onChange={handleNameChange} id="card-title-input" name="name" placeholder="Title" maxLength="30" required/>
        <span className={`form__input-error card-title-input-error ${!isNameValid? errorClassName:''}`}>{nameErrorMessage}</span>
      </label>
      <label className="form__label">
        <input type="url" ref={linkInputElement} className={`form__item form__item_el_card-link ${!isLinkValid? inputElementErrorClassName:''}`}
          onChange={handleLinkChange} id="card-link-input" name="link" placeholder="Image URL" required/>
        <span className={`form__input-error card-link-input-error ${!isLinkValid? errorClassName:''}`}>{linkErrorMessage}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;