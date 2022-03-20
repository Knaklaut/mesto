// Создание объекта с набором параметров для валидации форм
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Функция showInputError выводит сообщение об ошибке для всех элементов input во всех формах
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция hideInputError убирает сообщение об ошибке
const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// Функция isValid проверяет корректность заполнения элемента input и выводит сообщение об ошибке, если необходимо
const isValid = (formElement, inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
}

// Функция hasInvalidInput принимает массив полей input формы и возвращает true, если хотя бы одно поле не является валидным
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция toggleButtonState изменяет состояние кнопки в зависимости от наличия либо отсутствия невалидного элемента input в форме
const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)){
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
}

// Функция setEventListeners добавляет обработчики событий всем элементам input во всех формах
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  const inputListHandler = (inputElement) => {
    const handleInput = () => {
      isValid(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    }
    inputElement.addEventListener('input', handleInput);
  }
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
  inputList.forEach(inputListHandler);
}

// Функция enableValidation добавляет набор событий, реагирующих на заполнение полей input и действие отправки, для всех форм на странице
const enableValidation = (validationObj) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  const formListHandler = (formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  }
  formList.forEach(formListHandler);
}

enableValidation(validationObj);
