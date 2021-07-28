import { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const nameInputElement = useRef();
  const linkInputElement = useRef();

  const[isNameValid, setNameValid] = useState(true);
  const[isLinkValid, setLinkValid] = useState(true);
  const[nameErrorMessage, setNameErrorMessage] = useState('');
  const[linkErrorMessage, setLinkErrorMessage] = useState('');
  const[isButtonDisabled, setButtonDisabled] = useState(true);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
    handleValidation(nameInputElement, setNameValid, setNameErrorMessage);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    handleValidation(linkInputElement, setLinkValid, setLinkErrorMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({name:name, link:link});
  }

  function handleValidation(element, stateFunc, errorMessageFunc) {
    if (!element.current.validity.valid) {
      stateFunc(false);
      errorMessageFunc(element.current.validationMessage);
      setButtonDisabled(true);
      
    } else {
      stateFunc(true);
      errorMessageFunc('');
      toggleDisabledButton();
    }
  }

  function toggleDisabledButton() {
    if(nameInputElement.current.validity.valid 
      && linkInputElement.current.validity.valid) {
        setButtonDisabled(false);
    };
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
        <input type="text" ref={nameInputElement} className={`form__item form__item_el_card-title ${!isNameValid?'form__item_type_error':''}`} value={name} 
          onChange={handleNameChange} id="card-title-input" name="name" placeholder="Title" maxLength="30" required/>
        <span className={`form__input-error card-title-input-error ${!isNameValid?'form__input-error_visible':''}`}>{!isNameValid?nameErrorMessage:''}</span>
      </label>
      <label className="form__label">
        <input type="url" ref={linkInputElement} className={`form__item form__item_el_card-link ${!isLinkValid?'form__item_type_error':''}`} value={link} 
          onChange={handleLinkChange} id="card-link-input" name="link" placeholder="Image URL" required/>
        <span className={`form__input-error card-link-input-error ${!isLinkValid?'form__input-error_visible':''}`}>{!isLinkValid?linkErrorMessage:''}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;