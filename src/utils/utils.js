export function handleValidation(element, secondElement, stateFunc, errorMessageFunc, stateButtonFunc) {
  if (!element.current.validity.valid) {
    stateFunc(false);
    errorMessageFunc(element.current.validationMessage);
    stateButtonFunc(true);
    
  } else {
    stateFunc(true);
    errorMessageFunc('');
    toggleDisabledButton(element, secondElement, stateButtonFunc);
  }
}

export function toggleDisabledButton(element, secondElement, stateButtonFunc) {
  if(element.current.validity.valid 
    && secondElement.current.validity.valid) {
      stateButtonFunc(false);
  };
}