import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ popapSelector, handleFormSubmit }, formValidator) {
    super(popapSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.formValidator = formValidator;
    this.form = this._popap.querySelector('.popap__container');
    this._submitForm = this._submitForm.bind(this)
  };

  open() {
    super.open();
    this.formValidator.checkInputFirstOpen();
  }
  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm)
  }
  _getInputValues() {
    this._inputList = this.form.querySelectorAll('.popap__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}
