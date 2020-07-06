import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popapSelector) {
    super(popapSelector)
  }

  open(name, link) {
    super.open()
    this._popap.querySelector('.popap-image__name').textContent = name;
    this._popap.querySelector('.popap-image__content').src = link;
  }
}
