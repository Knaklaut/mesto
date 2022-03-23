// Функция showInputError выводит сообщение об ошибке для всех элементов input во всех формах
const showInputError = (formElement, inputElement, errorMessage, validationObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
}

// Функция hideInputError убирает сообщение об ошибке
const hideInputError = (formElement, inputElement, validationObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationObj.inputErrorClass);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = '';
}

// Функция isValid проверяет корректность заполнения элемента input и выводит сообщение об ошибке, если необходимо
const isValid = (formElement, inputElement, validationObj) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObj);
  } else {
    hideInputError(formElement, inputElement, validationObj);
  }
}

// Функция hasInvalidInput принимает массив полей input формы и возвращает true, если хотя бы одно поле не является валидным
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

// Функция toggleButtonState изменяет состояние кнопки в зависимости от наличия либо отсутствия невалидного элемента input в форме
const toggleButtonState = (inputList, buttonElement, validationObj) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// Функция setEventListeners добавляет обработчики событий всем элементам input во всех формах
const setEventListeners = (formElement, validationObj) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
}

// Функция enableValidation добавляет набор событий, реагирующих на заполнение полей input и действие отправки, для всех форм на странице
const enableValidation = validationObj => {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, validationObj);
  });
}

// Функция resetValidationState сбрасывает результаты валидации
const resetValidation = (popup, validationObj) => {
  const form = popup.querySelector(validationObj.formSelector);
  if (form){
    const inputs = Array.from(form.querySelectorAll(validationObj.inputSelector));
    const button = form.querySelector(validationObj.submitButtonSelector);
    toggleButtonState(inputs, button, validationObj);
    inputs.forEach((inputElement) => {
      hideInputError(form, inputElement, validationObj);
    });
  }
}
