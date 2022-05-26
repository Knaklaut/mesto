// Определение начального набора данных для работы с элементами страницы
// Объект с набором параметров для валидации форм
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Селекторы для создания экземпляров классов
const identificationObj = {
  popupUserProfile: '.popup_function_user-info',
  popupForAddingPhoto: '.popup_function_add-place',
  popupForChangingAvatar: '.popup_function_change-avatar',
  popupForConfirmingDeletion: '.popup_function_delete-photo',
  popupPhoto: '.popup_function_increase-photo',
  profileAvatar: '.profile__avatar',
  profileName: '.profile__title',
  profileAbout: '.profile__subtitle',
  elementsContainer: '.photobook__elements',
  elementRef: '#card',
  buttonForDeletingPhoto: '.card__delete-button',
};

// Определение ключевых переменных
const container = document.querySelector('.content');
const buttonEdit = container.querySelector('.profile__edit-button');
const buttonAddPhoto = container.querySelector('.profile__add-button');
const buttonChangeAvatar = container.querySelector('.profile__change-button');
const popupUserInfo = document.querySelector('.popup_function_user-info');
const popupUserInfoForm = popupUserInfo.querySelector('.popup__form');

export {
  validationObj,
  identificationObj,
  buttonEdit,
  buttonAddPhoto,
  buttonChangeAvatar,
  popupUserInfoForm
};
