// Класс UserInfo описывает функциональность, необходимую для корректного отображения пользовательских данных на странце

export default class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar }) {
    this._name =  document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._avatar = document.querySelector(selectorAvatar);
  }

  // Метод getUserInfo возвращает объект с пользовательскими данными
  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._about.textContent
    }
  }

  // Метод setUserInfo принимает обновленные пользовательские данные
  setUserInfo({ userName, userAbout }) {
    this._name.textContent = userName;
    this._about.textContent = userAbout;
  }

  // Метод setUserAvatar устанавливает новый аватар из источника, определенного пользователем
  setUserAvatar({ userAvatarSource }) {
    this._avatar.src = userAvatarSource;
  }
}
