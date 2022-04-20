// Импортирование объектов Card и FormValidator
import { validationObj, initialCards } from './data.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
  addCard(renderCard(item));
});

function renderCard(item) {
  const card = new Card(item, '#photobook__element', increasePhoto);
  return card.generateCard();
}

// Функция для добавления карточки с фотографией на страницу
function addCard(item) {
  photobook.prepend(item);
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
  addCard(renderCard(newPhoto));
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

// Функция для работы с формой редактирования пользовательских данных
function handleUserDataForm() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupWithUserInfo);
  userInfoValidator.resetValidation();
}

// Функция для работы с формой добавления нового фото
function handleNewPhotoForm() {
  openPopup(popupForAddingCards);
  newCardsValidator.resetValidation();
}

// Слушатели событий
// Слушатель события, открывающего всплывающее окно для редактирования пользовательских данных
buttonEdit.addEventListener('click', handleUserDataForm);

// Слушатель события отправки формы с пользовательскими данными
popupWithUserInfoForm.addEventListener('submit', submitFormWithUserInfo);

// Слушатель события, открывающего всплывающее окно для добавления нового фото
buttonAdd.addEventListener('click', handleNewPhotoForm);

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
