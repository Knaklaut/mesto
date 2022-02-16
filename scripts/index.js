// Определить переменные для элементов профиля
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__button_type_edit');
const profileName = profileContainer.querySelector('.profile__title');
const profileAbout = profileContainer.querySelector('.profile__subtitle');

// Определить переменные для элементов всплывающего окна
const popUp = document.querySelector('.popup');
const form = popUp.querySelector('.popup__form');
const closeButton = popUp.querySelector('.popup__close');
const nameInput = popUp.querySelector('.popup__item_el_name');
const aboutInput = popUp.querySelector('.popup__item_el_about');

// Создать функцию открытия всплывающего окна при клике по кнопке редактирования
function openPopUp(){
  popUp.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}
editButton.addEventListener('click', openPopUp);

//Создать функцию закрытия всплывающего окна при клике по кнопке 'Закрыть'
function closePopUp(){
  popUp.classList.toggle('popup_opened');
}
closeButton.addEventListener('click', closePopUp);

//Создать функцию отправки пользовательских данных в шапку профиля при клике по кнопке 'Сохранить' всплывающего окна
function formSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp();
}
form.addEventListener('submit', formSubmitHandler);
