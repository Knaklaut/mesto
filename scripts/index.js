// Импортирование объектов Card и FormValidator
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Определение начального набора данных для работы с элементами страницы
// Объект с набором параметров для валидации форм
export const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Массив с начальным набором карточек для загрузки на страницу
export const initialCards = [
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
// Переменные для элементов профиля
const profileContainer = document.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__edit-button');
const buttonAdd = profileContainer.querySelector('.profile__add-button');
const profileName = profileContainer.querySelector('.profile__title');
const profileAbout = profileContainer.querySelector('.profile__subtitle');

// Переменные для всплывающего окна редактирования данных пользователя
const popupWithUserInfo = document.querySelector('.popup_function_user-info');
const popupWithUserInfoForm = popupWithUserInfo.querySelector('.popup__form');
const inputName = popupWithUserInfo.querySelector('.popup__input_el_name');
const inputAbout = popupWithUserInfo.querySelector('.popup__input_el_about');

// Переменные для всплывающего окна с функцией добавления фотографий
const popupForAddingCards = document.querySelector('.popup_function_add-place');
const popupForAddingCardsForm = popupForAddingCards.querySelector('.popup__form');
const inputPlace = popupForAddingCards.querySelector('.popup__input_el_place');
const inputLink = popupForAddingCards.querySelector('.popup__input_el_link');

// Переменные для всплывающего окна с функцией просмотра увеличенной фотографии
const popupForIncreasedPhoto = document.querySelector('.popup_function_increase-photo');
const popupPhoto = popupForIncreasedPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupForIncreasedPhoto.querySelector('.popup__photo-title');

// Переменная для управления набором фотографий
const photobook = document.querySelector('.photobook__elements');

// Заполнение страницы карточками, определенными в массиве initialCards
initialCards.forEach(item => {
  renderCard(item);
});

function renderCard(item) {
  const card = new Card(item, '#photobook__element', increasePhoto);
  const newCard = card.generateCard();
  photobook.append(newCard);
}

// Создание экземпляров класса FormValidator c запуском валидации форм
const userInfoValidator = new FormValidator(validationObj, popupWithUserInfo);
userInfoValidator.enableValidation();

const newCardsValidator = new FormValidator(validationObj, popupForAddingCards);
newCardsValidator.enableValidation();

// Создание универсальных функций для открытия и закрытия всплывающих окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
}

// Функция для закрытия всплывающего окна при клике на "оверлей"
function closePopupWithOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция для закрытия всплывающего окна при нажатии на кнопку Esc
function closePopupWithEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Функция отправки пользовательских данных в шапку профиля при клике по кнопке 'Сохранить' всплывающего окна
function submitFormWithUserInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupWithUserInfoForm.reset();
  closePopup(popupWithUserInfo);
}

// Функция для добавления нового фото в фотоальбом
function handleSubmitPhoto(evt) {
  evt.preventDefault();
  const newPhoto = {
    name: inputPlace.value,
    link: inputLink.value,
  };
  photobook.prepend(new Card(newPhoto, '#photobook__element', increasePhoto).generateCard());
  popupForAddingCardsForm.reset();
  closePopup(popupForAddingCards);
}

// Функция для просмотра увеличенного фото в фотоальбоме
function increasePhoto(name, link) {
  openPopup(popupForIncreasedPhoto);
  popupPhotoTitle.textContent = name;
  popupPhoto.src = link;
  popupPhoto.alt = name;
}

// Слушатели событий
// Слушатель события, открывающего всплывающее окно для редактирования пользовательских данных
buttonEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupWithUserInfo);
  userInfoValidator.resetValidation();
});

// Слушатель события отправки формы с пользовательскими данными
popupWithUserInfoForm.addEventListener('submit', submitFormWithUserInfo);

// Слушатель события, открывающего всплывающее окно для добавления нового фото
buttonAdd.addEventListener('click', function() {
  openPopup(popupForAddingCards);
  newCardsValidator.resetValidation();
});

//Слушатель события отправки формы с данными для нового фото
popupForAddingCardsForm.addEventListener('submit', handleSubmitPhoto);

// Слушатель события для закрытия всплывающего окна при клике на "крестик"
Array.from(document.querySelectorAll('.popup__close')).forEach(closeButton => {
  closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup')));
});

// Слушатель события для закрытия всплывающего окна при клике на "оверлей"
Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('click', closePopupWithOverlayClick);
});
