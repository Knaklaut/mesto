// Класс FormValidator содержит набор методов для валидации форм ввода пользовательских данных

export class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = form;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._button = this._formElement.querySelector(this._submitButtonSelector);
    this._form = this._formElement.querySelector(this._formSelector);
  }

  // Метод showInputError выводит сообщение об ошибке для всех элементов input во всех формах
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Метод hideInputError убирает сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Метод hasInvalidInput принимает массив полей input формы и возвращает true, если хотя бы одно поле не является валидным
  _hasInvalidInput(inputs) {
    return inputs.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // Метод isValid проверяет корректность заполнения элемента input и выводит сообщение об ошибке, если необходимо
  _isValid(inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод toggleButtonState изменяет состояние кнопки в зависимости от наличия либо отсутствия невалидного элемента input в форме
  _toggleButtonState(inputs, button) {
    if(this._hasInvalidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  // Метод setEventListeners добавляет обработчики событий всем элементам input во всех формах
  _setEventListeners() {
    const inputs = this._inputs;
    const button = this._button;
    this._toggleButtonState(inputs, button);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  // Метод enableValidation добавляет набор событий, реагирующих на заполнение полей input и действие отправки, для всех форм на странице
  enableValidation() {
    this._setEventListeners();
  }

  // Метод resetValidation сбрасывает результаты валидации
  resetValidation() {
    const inputs = this._inputs;
    const button = this._button;
    this._toggleButtonState(inputs, button);
    inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
