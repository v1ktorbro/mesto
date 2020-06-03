export { validateEdtitPopap, validatePlusPopap, formObject };
//редактировать профиль
const formEdit = document.querySelector(".popap-edit").querySelector('.popap__container');
//добавить карточку
const formPlus = document.querySelector(".popap-place").querySelector('.popap__container');

const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active' //span с текстом ошибки
};

class FormValidator {
  constructor (object, form) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorSpanClass = object.errorSpanClass;
    this._form = form;
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorSpanClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorSpanClass);
    errorElement.textContent = '';
  };

  //очищалка ошибок у инпутов
  _clearInputError(inputsList, btnElem) {
    inputsList.forEach((input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove(this._inputErrorClass);
      //если в форме если хоть один невалидный инпут и кнопка не содержит класс с инактивацией кнопки
      if (this._hasInvalidInput(inputsList) && !btnElem.classList.contains(this._inactiveButtonClass)) {
        btnElem.classList.add(this._inactiveButtonClass);
      } else {
        btnElem.classList.remove(this._inactiveButtonClass);}
    })
  };

  //проверяем есть ли хоть один невалидный инпут
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.checkValidity();
    })
  };

  _toggleButtonState (inputList, btnElem) {
  if(this._hasInvalidInput(inputList)) {
    btnElem.disabled = true;
    btnElem.classList.add(this._inactiveButtonClass);
  } else {
    btnElem.disabled = false;
    btnElem.classList.remove(this._inactiveButtonClass);
  }
};

  _checkInputValidity(input) {
    if (!input.checkValidity()) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const btnElem = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, btnElem);
    inputList.forEach((input) => {
      input.addEventListener('input', ()=> {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, btnElem);
      })
    })
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault);
    this._setEventListener();
  }
}

const validateEdtitPopap = new FormValidator(formObject, formEdit);
validateEdtitPopap.enableValidation();

const validatePlusPopap = new FormValidator(formObject, formPlus);
validatePlusPopap.enableValidation();
