export class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._nameProfile = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
  }
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._about.textContent
    }
  }
  setUserInfo(data) {
    this._nameProfile.textContent = data.name
    this._about.textContent = data.about
  }
}
