import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor( popapSelector ) {
    super(popapSelector);
    this._form = this._popap.querySelector(".popap__container")
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (evt)=> {
      evt.preventDefault();
      this._callBackFunc()
    })
  }
  setSubmitAction(action) {
    this._callBackFunc = action
  }
}


