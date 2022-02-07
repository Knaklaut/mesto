// Определить переменные для элементов профиля
let profileContainer = document.querySelector('.profile');
let editButton = profileContainer.querySelector('.profile__button_edit');
let profileName = profileContainer.querySelector('.profile__title');
let profileAbout = profileContainer.querySelector('.profile__subtitle');

// Определить переменные для элементов всплывающего окна
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close');
let saveButton = popUp.querySelector('.popup__save');
let nameInput = popUp.querySelector('.popup__item_el_name');
let aboutInput = popUp.querySelector('.popup__item_el_about');

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
popUp.addEventListener('submit', formSubmitHandler);
