import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({name: name, about: description});
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  
  return(
    <PopupWithForm 
    name="edit-profile" 
    title="Edit profile" 
    buttonLabel="Save"
    loadingButtonlabel = "Saving..."
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}//isLoading={isLoading} {isLoading ? Saving:Save}
    isLoading = {isLoading}
    >
      <label className="form__label">
        <input type="text" className="form__item form__item_el_name" value={name || ''} onChange={handleNameChange}
          id="name-input" name="name" placeholder="Name" minLength="2" maxLength="40" required/>
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__label">
        <input type="text" className="form__item form__item_el_subtitle" value={description || ''} onChange={handleDescriptionChange} 
          id="subtitle-input" name="about" placeholder="About me" minLength="2" maxLength="200" required/>
        <span className="form__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>
  );

}

export default EditProfilePopup;