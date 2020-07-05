import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor( popapSelector, {callBackFunc} ) {
    super(popapSelector);
    this._form = this._popap.querySelector(".popap__container");
    this._callBackFunc = callBackFunc;
    super._setEventListeners()
  }

  open() {
    super.open()
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this.listener)
  }

  setSubmitAction(cardId, cardElem) {
    this.listener = (evt) => {
      evt.preventDefault();
      this._callBackFunc(cardId, cardElem);
      this._form.removeEventListener("submit", this.listener)
    }
    this._form.addEventListener("submit", this.listener)
  }
}


