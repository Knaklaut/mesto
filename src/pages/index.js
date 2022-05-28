import './index.css';

// Импортирование переменных
import {
  validationObj,
  identificationObj,
  buttonEdit,
  buttonAddPhoto,
  buttonChangeAvatar,
  popupUserInfoForm
} from "../utils/constants.js";

// Импортирование классов
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithNotice from "../components/PopupWithNotice.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

// Создание экземпляров классов
// Создание экземпляра класса Section и отрисовка элементов на странице
const cardList = new Section(
  {
    renderer: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  identificationObj.elementsContainer
);

// Создание экземпляра класса PopupWithImage и добавление слушателя событий
const popupWithImage = new PopupWithImage(identificationObj.popupPhoto);
popupWithImage.setEventListeners();

// Создание экземпляра класса PopupWithForm для формы с пользовательскими данными и добавление слушателя событий
const popupUserInfo = new PopupWithForm(identificationObj.popupUserProfile, data => {
  popupUserInfo.saveData(true);
  api.updateUserInfo({ name: data.userName, about: data.userAbout })
  .then(res => {
    userInfo.setUserInfo({ userName: res.name, userAbout: res.about });
    popupUserInfo.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupUserInfo.saveData(false);
  })
});
popupUserInfo.setEventListeners();

// Создание экземпляра класса PopupWithForm для формы с данными новой фотографии и добавление слушателя событий
const popupForAddingCards = new PopupWithForm(identificationObj.popupForAddingPhoto, handlePopupAddCard);
popupForAddingCards.setEventListeners();

// Создание экземпляра класса PopupWithForm для формы редактирования аватара
const popupFormChangeAvatar = new PopupWithForm(identificationObj.popupForChangingAvatar, data => {
  popupFormChangeAvatar.saveData(true);
  api.changeAvatar({ avatar: data.url })
  .then(res => {
    userInfo.setUserAvatar({ userAvatarSource: res.avatar });
    popupFormChangeAvatar.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupFormChangeAvatar.saveData(false);
  })
});
popupFormChangeAvatar.setEventListeners();

// Создание экземпляра класса PopupWithNotice для подтверждения удаления карточки из альбома и добавление слушателя событий
const popupWithNotice = new PopupWithNotice(identificationObj.popupForConfirmingDeletion);
popupWithNotice.setEventListeners();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: identificationObj.profileName,
  selectorAbout: identificationObj.profileAbout,
  selectorAvatar: identificationObj.profileAvatar
});

// Создание экземпляров класса FormValidator и включение валидации форм
const formValidationPopupAddCard = new FormValidator(validationObj, identificationObj.popupForAddingPhoto);
formValidationPopupAddCard.enableValidation();

const formValidationPopupProfile = new FormValidator(validationObj, identificationObj.popupUserProfile);
formValidationPopupProfile.enableValidation();

const formValidationPopupChangeAvatar = new FormValidator(validationObj, identificationObj.popupForChangingAvatar);
formValidationPopupChangeAvatar.enableValidation();

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'c5343f9b-1222-4d59-8c9a-f8d4405cea98',
    'Content-Type': 'application/json'
  }
});

// Получение начальных данных с сервера
api.getInitialData()
  .then(initialData => {
    const [cardData, userData] = initialData;
    userInfo.storeUserId(userData._id);
    userInfo.setUserInfo({ userName: userData.name, userAbout: userData.about });
    userInfo.setUserAvatar({ userAvatarSource: userData.avatar });
    cardList.renderItems(cardData);
  })
  .catch(err => {
    console.log(err);
  });

// Создание ключевых функций

// Функция для заполнения полей формы с пользовательскими данными информацией из профиля
function handleProfileData() {
  const userInfoReceived = userInfo.getUserInfo();
  popupUserInfoForm.userName.value = userInfoReceived.userName;
  popupUserInfoForm.userAbout.value = userInfoReceived.userAbout;
}

// Функция для создания карточки с фотографией
function createCard(newCard) {
  const card = new Card({ data: newCard, userId: userInfo.returnUserId(), handleCardClick, handleDeleteCard, handleLikeCard }, identificationObj.elementRef);
  return card.generateCard();
}

// Функция для добавления нового фото в фотоальбом
function handlePopupAddCard(newCard) {
  popupForAddingCards.saveData(true);
  api.postNewCard(newCard)
  .then(res => {
    cardList.addItem(createCard(res, res.owner._id));
    popupForAddingCards.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupForAddingCards.saveData(false);
  })
}

// Функция для просмотра увеличенного фото в фотоальбоме
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

// Функция для постановки и снятия лайка на карточке
function handleLikeCard(id, card) {
  if(card.isLiked) {
    api.dislikeCard(id)
    .then(res => {
      card.removeLike();
      card.updateLikesCounter(res.likes);
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    api.likeCard(id)
    .then(res => {
      card.addLike(res.likes);
      card.updateLikesCounter(res.likes);
    })
    .catch(err => {
      console.log(err);
    })
  }
}

// Функция для открытия всплывающего окна с подтверждением при попытке удаления карточки
function handleDeleteCard(id, card) {
  popupWithNotice.confirmDeletion(() => {
    handleConfirmDeletion(id, card);
  });
  popupWithNotice.open();
}

// Функция для удаления карточки при подтверждении действия во всплывающем окне
function handleConfirmDeletion(id, card) {
  api.deleteCard(id)
  .then(() => {
    card.removeCard();
    popupWithNotice.close();
  })
  .catch((err) => {
    console.log(err);
  });
}

// Слушатели событий
// Слушатель события, открывающего всплывающее окно для редактирования пользовательских данных
buttonEdit.addEventListener('click', () => {
  handleProfileData();
  popupUserInfo.open();
  formValidationPopupProfile.resetValidation();
});

// Слушатель события, открывающего всплывающее окно для редактирования аватара
buttonChangeAvatar.addEventListener('click', () => {
  popupFormChangeAvatar.open();
  formValidationPopupChangeAvatar.resetValidation();
});

// Слушатель события, открывающего всплывающее окно для добавления нового фото
buttonAddPhoto.addEventListener('click', () => {
  popupForAddingCards.open();
  formValidationPopupAddCard.resetValidation();
});
