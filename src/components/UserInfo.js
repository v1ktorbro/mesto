export class UserInfo {
  constructor(userNameSelector, userAboutSelector, avatarSelector) {
    this._nameProfile = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(avatarSelector)
  }
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }
  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._about.textContent = data.about;
    this.setUserAvatar(data)
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}
