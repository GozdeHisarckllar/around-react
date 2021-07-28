import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }){
  const linkInputElement = useRef();
  
  ////handleReset(ref) {ref.current.reset()}  onReset={handleReset} =><popupForm =>onSubmit={() =>{props.onReset(ref)}} or onSubmit={handleS} <--handleS(e,ref){props.onSubmit(e,ref)}
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: linkInputElement.current.value
    });
    //pictureLinkInput.current.value='';
  }

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
    >
      <label className="form__label">
        <input type="url" ref={linkInputElement} className="form__item form__item_el_avatar-link" id="avatar-link-input" name="avatar" placeholder="Picture URL" required/>
        <span className="form__input-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;