export class Popap {
  constructor(popapSelector) {
    this._popap = document.querySelector(popapSelector)
  }
  open() {
    this._popap.classList.remove("popap_closed");
    this._setEventListeners()
  }
  close() {
    this._popap.classList.add("popap_closed")
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      document.removeEventListener('keydown', (evt)=> this._handleEscClose(evt))
    }
  }
  _setEventListeners() {
    const btnClose = this._popap.querySelector(".popap__close");
    btnClose.addEventListener("click", ()=> this.close());
    document.addEventListener("keydown", (evt)=> this._handleEscClose(evt))
  }
}
