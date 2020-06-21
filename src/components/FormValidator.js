export class FormValidator {
  constructor (object, form) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorSpanClass = object.errorSpanClass;
    this._form = document.querySelector(form);
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
    inputList.forEach((input) => {
      input.addEventListener('input', ()=> {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, btnElem);
      })
    })
  };

  //очищаем | добавляем ошибки у инпутов формы при ее открытии
  checkInputFirstOpen() {
    //кнопка сохранить | создать
    const btnElem = this._form.querySelector(this._submitButtonSelector);
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((input) => {
      this._checkInputValidity(input);
      this._toggleButtonState(inputList, btnElem)
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault);
    this._setEventListener();
  }
};
