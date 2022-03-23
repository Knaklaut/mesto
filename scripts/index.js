// Определить ключевые переменные
// Переменные для элементов профиля
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit-button');
const addButton = profileContainer.querySelector('.profile__add-button');
const profileName = profileContainer.querySelector('.profile__title');
const profileAbout = profileContainer.querySelector('.profile__subtitle');

// Переменные для всплывающего окна редактирования данных пользователя
const popupWithUserInfo = document.querySelector('.popup_function_user-info');
const popupWithUserInfoForm = popupWithUserInfo.querySelector('.popup__form');
const nameInput = popupWithUserInfo.querySelector('.popup__input_el_name');
const aboutInput = popupWithUserInfo.querySelector('.popup__input_el_about');

// Переменные для всплывающего окна с функцией добавления фотографий
const popupForAddingCards = document.querySelector('.popup_function_add-place');
const popupForAddingCardsForm = popupForAddingCards.querySelector('.popup__form');
const placeInput = popupForAddingCards.querySelector('.popup__input_el_place');
const linkInput = popupForAddingCards.querySelector('.popup__input_el_link');

// Переменные для всплывающего окна с функцией просмотра увеличенной фотографии
const popupForIncreasedPhoto = document.querySelector('.popup_function_increase-photo');
const popupPhoto = popupForIncreasedPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupForIncreasedPhoto.querySelector('.popup__photo-title');

// Переменные для управления набором фотографий
const photobook = document.querySelector('.photobook__elements');
const photoTemplate = document.querySelector('#photobook__element').content;

// Наполнить страницу карточками, определенными в массиве initialCards
initialCards.forEach(item => {
  renderCard(item);
});

function renderCard(item){
  photobook.append(createNewPhotoEl(item));
}

// Запустить функцию для валидации пользовательских форм
enableValidation(validationObj);

// Создать универсальные функции для открытия и закрытия всплывающих окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  resetValidation (popup, validationObj);
  document.addEventListener('keydown', closePopupWithEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
  const popupForm = popup.querySelector('.popup__form');
  if (popupForm){
    popupForm.reset();
  }
}

// Создать слушатель события для закрытия всплывающего окна при клике на "крестик"
Array.from(document.querySelectorAll('.popup__close')).forEach(closeButton => {
  closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup')));
});

// Создать слушатель события, открывающего всплывающее окно для добавления нового фото
addButton.addEventListener('click', () => openPopup(popupForAddingCards));

// Создать слушатель события для открытия всплывающего окна с увеличенным фото
photobook.addEventListener('click', evt => {
  if (evt.target.classList.contains('photobook__photo')){
    openPopup(popupForIncreasedPhoto);
    popupPhotoTitle.textContent = evt.target.closest('.photobook__element').querySelector('.photobook__place').textContent;
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
  }
});

// Создать функцию для закрытия всплывающего окна при нажатии на кнопку Esc
function closePopupWithEscape(evt) {
  if (evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Создать функцию для закрытия всплывающего окна при клике на "оверлей"
function closePopupWithOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Создать слушатель события для закрытия всплывающего окна при клике на "оверлей"
Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('click', closePopupWithOverlayClick);
});

// Создать функцию отправки пользовательских данных в шапку профиля при клике по кнопке 'Сохранить' всплывающего окна
function submitFormWithUserInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupWithUserInfo);
}

popupWithUserInfoForm.addEventListener('submit', submitFormWithUserInfo);

// Создать слушатель события, открывающего всплывающее окно для редактирования пользовательских данных
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupWithUserInfo);
});

// Создать функцию для генерации карточки с фото
function createNewPhotoEl(item) {
  const photoClone = photoTemplate.cloneNode(true);
  const photoEl = photoClone.querySelector('.photobook__photo');
  const photoTitle = photoClone.querySelector('.photobook__place');
  photoTitle.textContent = item.name;
  photoEl.src = item.link;
  photoEl.alt = item.name;
  photoClone.querySelector('.photobook__delete-button').addEventListener('click', deletePhoto);
  photoClone.querySelector('.photobook__like-button').addEventListener('click', likePhoto);
  return photoClone;
}

// Создать функцию для добавления нового фото в фотоальбом
function handleSubmitPhoto(evt) {
  evt.preventDefault();
  const newPhoto = {
    name: placeInput.value,
    link: linkInput.value,
  };
  photobook.prepend(createNewPhotoEl(newPhoto));
  closePopup(popupForAddingCards);
}

popupForAddingCardsForm.addEventListener('submit', handleSubmitPhoto);

// Создать функцию для удаления фотографии
function deletePhoto(evt){
  evt.target.closest('.photobook__element').remove();
}

// Создать функцию для проставления лайка на фотографии
function likePhoto(evt){
  evt.target.classList.toggle('photobook__like-button_active');
}
