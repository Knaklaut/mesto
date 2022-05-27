import Popup from './Popup.js';

// Класс PopupWithForm наследует от класса Popup и содержит специфические функции для работы с формами, предполагающими обработку пользовательских данных
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitData) {
    super(popupSelector);
    this._handleSubmitData = handleSubmitData;
    this._popupForm = this._popupEl.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__input');
    this._button = this._popupForm.querySelector('.popup__submit-btn');
    this._buttonName = this._button.textContent;
  }

  // Метод close родительского класса расширяется за счет добавления функциональности сброса пользовательских данных
  close() {
    super.close();
    this._popupForm.reset();
  }

  // Метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    this._formData = {};
    this._inputs.forEach(input => {
      this._formData[input.name] = input.value;
    });
    return this._formData;
  }

  //Метод saveData изменяет текст кнопки формы в зависимости от статуса загрузки данных на сервер
  saveData(saving) {
    if(saving) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonName;
    }
  }

  // Метод setEventListeners родительского класса расширяется за счет добавления обработчика отправки формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitData(this._getInputValues());
    });
  }
}
