import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor( popapSelector, api ) {
    super(popapSelector);
    this._form = this._popap.querySelector(".popap__container")
    this._api = api
  }

  open(cardId, el) {
    super.open()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._api.deleteCard(cardId, el);
      this.close()
    }, {once: true})
  }
}


