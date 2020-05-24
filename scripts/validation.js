const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active' //span с текстом ошибки
};

function checkInputValidity(form, input, formObject) {
  if (!input.checkValidity()) {
    showInputError(form, input, input.validationMessage, formObject);
  } else {
    hideInputError(form, input, formObject);
  }
};

//проверяем есть ли хоть один невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.checkValidity();
  })
};

function showInputError(form, input, errorMessage, formObject) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(formObject.inputErrorClass);
  errorElement.classList.add(formObject.errorSpanClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(form, input, formObject) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorSpanClass);
  errorElement.textContent = '';
};

//очищалка ошибок у инпутов
function clearInputError(inputsList, form, btnElem, formObject) {
  inputsList.forEach((input) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(formObject.inputErrorClass);
    //если в форме если хоть один невалидный инпут и кнопка не содержит класс с инактивацией кнопки
    if (hasInvalidInput(inputsList) && !btnElem.classList.contains(formObject.inactiveButtonClass)) {
      btnElem.classList.add(formObject.inactiveButtonClass);
    } else {
      btnElem.classList.remove(formObject.inactiveButtonClass);}
  })
};

function toggleButtonState (inputList, btnElem, formObject) {
  if(hasInvalidInput(inputList)) {
    btnElem.disabled = true;
    btnElem.classList.add(formObject.inactiveButtonClass);
  } else {
    btnElem.disabled = false;
    btnElem.classList.remove(formObject.inactiveButtonClass);
  }
};

function setEventListener(form, formObject) {
  const inputList = Array.from(form.querySelectorAll(formObject.inputSelector));
  const btnElem = form.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, btnElem, formObject);
  inputList.forEach((input) => {
    input.addEventListener('input', ()=> {
      checkInputValidity(form, input, formObject);
      toggleButtonState(inputList, btnElem, formObject);
    })
  })
};

function enableValidation (formObject) {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListener(form, formObject);
  })
};
enableValidation(formObject);
