import { useContext, useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { handleValidation } from '../utils/utils';
import { inputElementErrorClassName, errorClassName} from '../utils/constants';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const nameInputElement = useRef();
  const descriptionInputElement = useRef();

  const[isNameValid, setNameValid] = useState(true);
  const[isDescriptionValid, setDescriptionValid] = useState(true);
  const[nameErrorMessage, setNameErrorMessage] = useState('');
  const[descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
  const[isButtonDisabled, setButtonDisabled] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
    handleValidation(
      nameInputElement,
      descriptionInputElement,
      setNameValid, 
      setNameErrorMessage,
      setButtonDisabled
    );
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    handleValidation(
      descriptionInputElement,
      nameInputElement,
      setDescriptionValid, 
      setDescriptionErrorMessage,
      setButtonDisabled
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({name: name, about: description});
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setButtonDisabled(true);
  }, [currentUser]);

  return(
    <PopupWithForm 
    name="edit-profile" 
    title="Edit profile" 
    buttonLabel="Save"
    loadingButtonLabel = "Saving..."
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isLoading = {isLoading}
    isButtonDisabled={isButtonDisabled}
    >
      <label className="form__label">
        <input type="text" ref={nameInputElement} className={`form__item form__item_el_name ${!isNameValid? inputElementErrorClassName:''}`} 
          value={name || ''} onChange={handleNameChange} id="name-input" name="name" placeholder="Name" minLength="2" maxLength="40" required/>
        <span className={`form__input-error name-input-error ${!isNameValid? errorClassName:''}`}>{nameErrorMessage}</span>
      </label>
      <label className="form__label">
        <input type="text" ref={descriptionInputElement} className={`form__item form__item_el_subtitle ${!isDescriptionValid? inputElementErrorClassName:''}`} 
          value={description || ''} onChange={handleDescriptionChange} id="subtitle-input" name="about" placeholder="About me" minLength="2" maxLength="200" required/>
        <span className={`form__input-error subtitle-input-error ${!isDescriptionValid? errorClassName:''}`}>{descriptionErrorMessage}</span>
      </label>
    </PopupWithForm>
  );

}

export default EditProfilePopup;