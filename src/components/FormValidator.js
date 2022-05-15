// Класс FormValidator содержит набор методов для валидации форм ввода пользовательских данных

export default class FormValidator {
  constructor(data, popupSelector) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formEl = document.querySelector(popupSelector);
  }

  // Метод _showInputError выводит сообщение об ошибке для всех элементов input во всех формах
  _showInputError(inputEl, errorMessage) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  }

  // Метод _hideInputError убирает сообщение об ошибке
  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = '';
  }

  // Метод hasInvalidInput принимает массив полей input формы и возвращает true, если хотя бы одно поле не является валидным
  _hasInvalidInput(inputs) {
    return inputs.some(inputEl => {
      return !inputEl.validity.valid;
    });
  }

  // Метод _isValid проверяет корректность заполнения элемента input и выводит сообщение об ошибке, если необходимо
  _isValid(inputEl) {
    if(inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl, inputEl.validationMessage);
    }
  }


  // Метод _toggleButtonState изменяет состояние кнопки в зависимости от наличия либо отсутствия невалидного элемента input в форме
  _toggleButtonState(inputs, button) {
    if(this._hasInvalidInput(inputs)) {
      button.setAttribute('disabled', true);
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this._inactiveButtonClass);
    }
  }

  // Метод _setEventListeners добавляет обработчики событий всем элементам input во всех формах
  _setEventListeners() {
    this._inputs = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    this._button = this._formEl.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this._inputs, this._button);
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(this._inputs, this._button);
      });
    });
  }

  // Метод enableValidation добавляет набор событий, реагирующих на заполнение полей input и действие отправки, для всех форм на странице
  enableValidation() {
    this._setEventListeners();
  }

  // Метод resetValidation сбрасывает результаты валидации
  resetValidation() {
    const form = this._formEl.querySelector(this._formSelector);
    const inputs = Array.from(form.querySelectorAll(this._inputSelector));
    const button = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
