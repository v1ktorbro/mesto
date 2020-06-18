import { Popap } from "./Popap.js";
export class PopupWithForm extends Popap {
  constructor({ popapSelector, handleFormSubmit }) {
    super(popapSelector);
    this._handleFormSubmit = handleFormSubmit
  };

  _getForm() {
    const formElement = this._popap.querySelector('.popap__container');
    return formElement
  }
  close() {
    super.close();
    //если это форма с карточкой, то после закрытия формы - сбрасываем ее
    if (this._popap.classList.contains("popap-place")) {
      const form = this._popap.querySelector('.popap__container');
      form.reset();
    }
  }
  _setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }
  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popap__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    this.close()
    return this._formValues;
  }
  setForm() {
    this._element = this._getForm();
    this._setEventListeners();
    return this._element;
  }
}
