import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popapSelector) {
    super(popapSelector);
    this._overlayPopap = (evt) => {
      if (evt.target.classList.contains('popap-image')) evt.target.classList.add('popap-image_closed');
    };
    this._setEventListeners()
  }

  open(name, link) {
    this._popap.querySelector('.popap-image__name').textContent = name;
    this._popap.querySelector('.popap-image__content').src = link;
    this._popap.classList.remove("popap-image_closed");
  }
  close() {
    this._popap.classList.add("popap-image_closed");
    document.removeEventListener('mousedown', this._overlayPopap)
  }
  _setEventListeners() {
    const btnClose = this._popap.querySelector(".popap-image__close");
    btnClose.addEventListener("click", ()=> this.close());
    document.addEventListener("keydown", this._handleEscClose)
    document.addEventListener('click', this._overlayPopap)
  }
}
