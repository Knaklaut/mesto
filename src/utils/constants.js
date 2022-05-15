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
  profileName: '.profile__title',
  profileAbout: '.profile__subtitle',
  popupPhoto: '.popup_function_increase-photo',
  elementsContainer: '.photobook__elements',
  elementRef: '#card',
};

// Массив с начальным набором карточек для загрузки на страницу
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Определение ключевых переменных
const container = document.querySelector(".content");
const popupProfile = document.querySelector('.popup_function_user-info');
const popupCards = document.querySelector('.popup_function_add-place');
const buttonEdit = container.querySelector(".profile__edit-button");
const buttonAddPhoto = container.querySelector(".profile__add-button");
const inputName = popupProfile.querySelector('.popup__input_el_name');
const inputAbout = popupProfile.querySelector('.popup__input_el_about');

export {
  validationObj,
  identificationObj,
  initialCards,
  buttonEdit,
  buttonAddPhoto,
  inputName,
  inputAbout
};
