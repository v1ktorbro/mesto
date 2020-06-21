export class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._nameProfile = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
  }
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      description: this._description.textContent
    }
  }
  setUserInfo(data) {
    this._nameProfile.textContent = data.name
    this._description.textContent = data.description
  }
}
