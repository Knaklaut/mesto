// Определить ключевые переменные
// Переменные для элементов профиля
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__button_type_edit');
const addButton = profileContainer.querySelector('.profile__button_type_add');
const profileName = profileContainer.querySelector('.profile__title');
const profileAbout = profileContainer.querySelector('.profile__subtitle');

// Перменные для всплывающего окна редактирования данных пользователя
const popupWithUserInfo = document.querySelector('.popup_function_user-info');
const formEdit = popupWithUserInfo.querySelector('.popup__form_function_edit-info');
const closeButtonUserInfo = popupWithUserInfo.querySelector('.popup__close_function_edit-info');
const nameInput = popupWithUserInfo.querySelector('.popup__input_el_name');
const aboutInput = popupWithUserInfo.querySelector('.popup__input_el_about');

// Переменные для всплывающего окна с функцией добавления фотографий
const popupForAddingCards = document.querySelector('.popup_function_add-place');
const formAdd = popupForAddingCards.querySelector('.popup__form_function_add-place');
const closeButtonAddingCards = popupForAddingCards.querySelector('.popup__close_function_add-place');
const placeInput = popupForAddingCards.querySelector('.popup__input_el_place');
const linkInput = popupForAddingCards.querySelector('.popup__input_el_link');
const buttonForAddingCards = popupForAddingCards.querySelector('.popup__button');

// Переменные для всплывающего окна с функцией просмотра увеличенной фотографии
const popupForIncreasedPhoto = document.querySelector('.popup_function_increase-photo');
const popupPhoto = popupForIncreasedPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupForIncreasedPhoto.querySelector('.popup__title');
const closeButtonPhoto = popupForIncreasedPhoto.querySelector('.popup__close_function_increase-photo');

// Переменные для управления набором фотографий
const photobook = document.querySelector('.photobook__elements');
const photoTemplate = document.querySelector('#photobook__element').content;

// Наполнить страницу карточками, определенными в массиве initialCards

initialCards.forEach(item => {
  renderCard(item);
});

// Создать функцию для присвоения вводимых пользователем значений в строках всплывающего окна текстовым элементам веб-страницы
function assignInputs(){
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function resetPopup(popup){
  const errors = popup.querySelectorAll('.popup__input-error');
  errors.forEach((error) => error.textContent = '');
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
}

// Создать универсальные функции для открытия и закрытия всплывающих окон, добавления нового элемента в фотоальбом

function openPopup(popupEl){
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscape);
}

function closePopup(popupEl){
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
}

function openPopupWithUserInfo(){
  assignInputs();
  resetPopup(popupWithUserInfo);
  openPopup(popupWithUserInfo);
}

function openPopupForAddingCards(){
  resetPopup(popupForAddingCards);
  openPopup(popupForAddingCards);
}

function closePopupWithUserInfo(){
  closePopup(popupWithUserInfo);
}

function closePopupForAddingCards(){
  closePopup(popupForAddingCards);
}

function closePopupWithPhoto(){
  closePopup(popupForIncreasedPhoto);
}

// Создать функцию для закрытия всплывающего окна при нажатии на кнопку Esc
function closePopupWithEscape(evt){
  if(evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Создать функцию для закрытия всплывающего окна при клике на "оверлей"
function closePopupWithOverlayClick(evt){
  if(evt.target.classList.contains('popup_opened')){
    closePopup(evt.target);
  }
}

function renderCard(item){
  photobook.append(createNewPhotoEl(item));
}

// Создать функцию для отключения кнопки
const setButtonStateDisabled = (evt) => {
  const submitButtonElement = evt.target.querySelector('.popup__button-save');
  submitButtonElement.classList.add('popup__button-save_disabled');
  submitButtonElement.disabled = true;
}

// Создать функцию отправки пользовательских данных в шапку профиля при клике по кнопке 'Сохранить' всплывающего окна
function submitFormWithUserInfo(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopupWithUserInfo();
}
formEdit.addEventListener('submit', submitFormWithUserInfo);

// Создать набор функций для добавления новой карточки в фотоальбом
function createNewPhotoEl(item){
  const photoClone = photoTemplate.querySelector('.photobook__element').cloneNode(true);
  const photo = photoClone.querySelector('.photobook__photo');
  photoClone.querySelector('.photobook__place').textContent = item.name;
  photo.alt = item.name;
  photo.src = item.link;
  photo.addEventListener('click', openPhoto);
  photoClone.querySelector('.photobook__button-delete').addEventListener('click', deletePhoto);
  photoClone.querySelector('.photobook__button-like').addEventListener('click', likePhoto);

  return photoClone;
}

function handleSubmitPhoto(evt){
  evt.preventDefault();
  const newPhoto = createNewPhotoEl({
    name: placeInput.value,
    link: linkInput.value
  });
  photobook.prepend(newPhoto);
  formAdd.reset();
  setButtonStateDisabled(evt);
  closePopupForAddingCards();
}

// Создать функцию для открытия фотографии
function openPhoto(evt){
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
  popupPhotoTitle.textContent = evt.target.alt;
  openPopup(popupForIncreasedPhoto);
}

// Создать функцию для удаления фотографии
function deletePhoto(evt){
  evt.target.closest('.photobook__element').remove();
}

// Создать функцию для проставления лайка на фотографии
function likePhoto(evt){
  evt.target.classList.toggle('photobook__button-like_active');
}

// Создать функцию для хранения обработчиков событий
function setEventListeners(){
  editButton.addEventListener('click', openPopupWithUserInfo);
  closeButtonUserInfo.addEventListener('click', closePopupWithUserInfo);
  addButton.addEventListener('click', openPopupForAddingCards);
  formAdd.addEventListener('submit', handleSubmitPhoto);
  closeButtonAddingCards.addEventListener('click', closePopupForAddingCards);
  closeButtonPhoto.addEventListener('click', closePopupWithPhoto);
  popupWithUserInfo.addEventListener('click', closePopupWithOverlayClick);
  popupForAddingCards.addEventListener('click', closePopupWithOverlayClick);
  popupForIncreasedPhoto.addEventListener('click', closePopupWithOverlayClick);
}

setEventListeners();
