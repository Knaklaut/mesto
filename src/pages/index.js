import './index.css';

// Импортирование переменных
import {
  validationObj,
  initialCards,
  identificationObj,
  buttonEdit,
  buttonAddPhoto,
  inputName,
  inputAbout
} from "../utils/constants.js";

// Импортирование классов
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

// Создание экземпляров классов
// Создание экземпляра класса Section и отрисовка элементов на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cardList.addItem(createCard(cardItem));
    },
  },
  identificationObj.elementsContainer
);
cardList.renderItems();

// Создание экземпляра класса PopupWithImage и добавление слушателя событий
const popupWithImage = new PopupWithImage(identificationObj.popupPhoto);
popupWithImage.setEventListeners();

// Создание экземпляра класса PopupWithForm для формы с пользовательскими данными и добавление слушателя событий
const popupUserInfo = new PopupWithForm(identificationObj.popupUserProfile, handleUserInfo);
popupUserInfo.setEventListeners();

// Создание экземпляра класса PopupWithForm для формы с данными новой фотографии и добавление слушателя событий
const popupForAddingCards = new PopupWithForm(identificationObj.popupForAddingPhoto, handlePopupAddCard);
popupForAddingCards.setEventListeners();

// Создание экземпляра класса UserInfo и добавление слушателя событий
const userInfo = new UserInfo({
  selectorName: identificationObj.profileName,
  selectorAbout: identificationObj.profileAbout
});

// Создание экземпляров класса FormValidator и включение валидации форм
const formValidationPopupAddCard = new FormValidator(validationObj, identificationObj.popupForAddingPhoto);
formValidationPopupAddCard.enableValidation();

const formValidationPopupProfile = new FormValidator(validationObj, identificationObj.popupUserProfile);
formValidationPopupProfile.enableValidation();

// Создание ключевых функций

// Функция для заполнения полей формы с пользовательскими данными информацией из профиля
function handleInputData() {
  const userInfoReceived = userInfo.getUserInfo();
  inputName.value = userInfoReceived.userName;
  inputAbout.value = userInfoReceived.userAbout;
}

// Функция отправки пользовательских данных в шапку профиля при клике по кнопке 'Сохранить' всплывающего окна
function handleUserInfo(data) {
  userInfo.setUserInfo({
    userName: data['userName'],
    userAbout: data['userAbout']
  });
  popupUserInfo.close();
}

// Функция для просмотра увеличенного фото в фотоальбоме
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

// Функция для создания карточки с фотографией
function createCard(item) {
  const card = new Card({ data: item, handleCardClick }, identificationObj.elementRef);
  return card.generateCard();
}

// Функция для добавления нового фото в фотоальбом
function handlePopupAddCard(newData) {
  const newCard = createCard(newData);
  cardList.addItem(newCard);
  popupForAddingCards.close();
}

// Слушатели событий
// Слушатель события, открывающего всплывающее окно для редактирования пользовательских данных
buttonEdit.addEventListener('click', () => {
  handleInputData();
  popupUserInfo.open();
  formValidationPopupProfile.resetValidation();
});

// Слушатель события, открывающего всплывающее окно для добавления нового фото
buttonAddPhoto.addEventListener('click', () => {
  popupForAddingCards.open();
  formValidationPopupAddCard.resetValidation();
});
