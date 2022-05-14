import Popup from './Popup.js';

// Класс PopupWithForm наследует от класса Popup и содержит специфические функции для работы с формами, предполагающими обработку пользовательских данных
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popupEl.querySelector(".popup__form");
    this._inputsNew = this._popupForm.querySelectorAll(".popup__input");
  }

  // Метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    this._valuesNew = {};
    this._inputsNew.forEach((input) => {
      this._valuesNew[input.name] = input.value;
    });
    return this._valuesNew;
  }

  // Метод close родительского класса расширяется за счет добавления функциональности сброса пользовательских данных
  close() {
    super.close();
    this._popupForm.reset();
  }

  // Метод setEventListeners родительского класса расширяется за счет добавления обработчика отправки формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
