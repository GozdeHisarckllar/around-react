import { useContext, useEffect, useRef, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { inputElementErrorClassName, errorClassName} from '../utils/constants';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }){
  const currentUser = useContext(CurrentUserContext);
  const linkInputElement = useRef();
  
  const [isLinkValid, setLinkValid] = useState(true);
  const [linkErrorMessage, setLinkErrorMessage] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: linkInputElement.current.value
    });
  }

  function handleAvatarLinkValidation() {
    if (!linkInputElement.current.validity.valid) {
      setLinkValid(false);
      setLinkErrorMessage(linkInputElement.current.validationMessage);
      setButtonDisabled(true);
    } else {
      setLinkValid(true);
      setLinkErrorMessage('');
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    linkInputElement.current.value = '';
    setButtonDisabled(true);
  }, [currentUser]);

  return(
    <PopupWithForm 
      name="change-avatar" 
      title="Change profile picture" 
      buttonLabel="Save"
      loadingButtonLabel = "Saving..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonDisabled={isButtonDisabled}
    >
      <label className="form__label">
        <input type="url" ref={linkInputElement} className={`form__item form__item_el_avatar-link ${!isLinkValid? inputElementErrorClassName:''}`} 
          onChange={handleAvatarLinkValidation} id="avatar-link-input" name="avatar" placeholder="Picture URL" required/>
        <span className={`form__input-error avatar-link-input-error ${!isLinkValid? errorClassName:''}`}>{linkErrorMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;