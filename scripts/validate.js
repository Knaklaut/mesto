//Создание объекта classNames с набором ключей - названий классов для функции enableValidation
const classNames = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Функция hasInvalidInput принимает массив полей input формы и возвращает true, если хотя бы одно поле не является валидным
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Функция toggleButtonState изменяет состояние кнопки в зависимости от наличия либо отсутствия невалидного элемента input в форме
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

//Функция showInputError выводит сообщение об ошибке для всех элементов input во всех формах
const showInputError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//Функция hideInputError убирает сообщение об ошибке
const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//Функция isValid проверяет корректность заполнения элемента input и выводит сообщение об ошибке, если необходимо
const isValid = (formElement, inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
}

//Функция setEventListeners добавляет обработчики событий всем элементам input во всех формах
const setEventListeners = (formElement, classNames) => {
  const inputList = Array.from(formElement.querySelectorAll(`${classNames.inputSelector}`));
  const buttonElement = formElement.querySelector(`${classNames.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, classNames.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, classNames.errorClass, classNames.inputErrorClass);
      toggleButtonState(inputList, buttonElement, classNames.inactiveButtonClass);
    });
  });
}

//Функция enableValidation добавляет набор событий, реагирующих на заполнение полей input и действие отправки, для всех форм на странице
const enableValidation = (classNames) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, classNames);
  });
}

//Включение валидации вызовом enableValidation
//Все настройки передаются при вызове
enableValidation(classNames);
