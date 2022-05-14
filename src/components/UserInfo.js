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
    };
  }

  // Метод setUserInfo принимает новые пользовательские данные и добавляет их на страницу
  setUserInfo(updateName, updateAbout) {
    this._name.textContent = updateName.value;
    this._about.textContent = updateAbout.value;
  }
}
