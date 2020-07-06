export class Popup {
  constructor(popapSelector) {
    this._popap = document.querySelector(popapSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayPopap = this._overlayPopap.bind(this)
  }
  open() {
    this._popap.classList.remove("popap_closed");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener('mousedown', this._overlayPopap)
  }
  close() {
    this._popap.classList.add("popap_closed");
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._overlayPopap)
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close()
  }
  _overlayPopap(evt) {
    if (evt.target.classList.contains('popap')) this.close()
  }
  setEventListeners() {
    const btnClose = this._popap.querySelector(".popap__close");
    btnClose.addEventListener("click", ()=> this.close());
  }
}
