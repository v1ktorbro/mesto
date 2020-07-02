import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ popapSelector, handleFormSubmit }, formValidator) {
    super(popapSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.formValidator = formValidator;
    this._submitForm = this._submitForm.bind(this)
  };

  _getForm() {
    const formElement = this._popap.querySelector('.popap__container');
    return formElement
  }
  open() {
    super.open();
    this.formValidator.checkInputFirstOpen();
  }

  close() {
    super.close();
    //если это форма с карточкой, то после закрытия формы - сбрасываем ее
    if (this._popap.classList.contains("popap-place")) {
      const form = this._popap.querySelector('.popap__container');
      form.reset();
    }
  }
  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._submitForm)
  }
  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popap__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    /* this.close(); */
    return this._formValues;
  }
  setForm() {
    this._element = this._getForm();
    this._setEventListeners();
    return this._element;
  }
}
