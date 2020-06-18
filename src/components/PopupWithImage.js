import { Popap } from "./Popap.js";
export class PopupWithImage extends Popap {
  constructor(popapSelector) {
    super(popapSelector)
  }
  open(name, link) {
    this._popap.querySelector('.popap-image__name').textContent = name;
    this._popap.querySelector('.popap-image__content').src = link;
    this._popap.classList.remove("popap-image_closed");
    this._setEventListeners()
  }
  close() {
    this._popap.classList.add("popap-image_closed")
  }
  _setEventListeners() {
    const btnClose = this._popap.querySelector(".popap-image__close");
    btnClose.addEventListener("click", ()=> this.close());
    document.addEventListener("keydown", (evt)=> super._handleEscClose(evt))
  }
}
