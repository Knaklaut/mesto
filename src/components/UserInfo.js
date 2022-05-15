// Класс UserInfo описывает функциональность, необходимую для корректного отображения пользовательских данных на странце

export default class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._name =  document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
  }

  // Метод getUserInfo возвращает объект с пользовательскими данными
  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._about.textContent
    }
  }

  // Метод setUserInfo принимает обновленные пользовательские данные
  setUserInfo(userName, userAbout) {
    this._name.textContent = userName;
    this._about.textContent = userAbout
  }
}
