export class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._nameProfile = document.querySelector(userNameSelector);
    this._jobProfile = document.querySelector(userJobSelector);
  }
  getUserInfo() {
    this._nameInput = document.querySelector(".popap__input-name");
    this._jobInput = document.querySelector(".popap__input-signature");
    this._nameInput.value = this._nameProfile.textContent;
    this._jobInput.value = this._jobProfile.textContent;
  }
  setUserInfo() {
    this._nameProfile.textContent = this._nameInput.value;
    this._jobProfile.textContent = this._jobInput.value;
  }
}
