import Popup from './Popup.js';

//Класс PopupWithNotice наследует от класса Popup и описывает функциональность всплывающего окна с подтверждением удаления фотографии из альбома
export default class PopupWithNotice extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupEl.querySelector('.popup__form');
  }

  // Метод confirmDeletion устанавливает правило для подтверждения удаления карточки
  confirmDeletion(confirm) {
    this._confirmDeletionCallback = confirm;
  }

  // Метод setEventListeners расширяет родительский метод для обработки действия при нажатии на кнопку подтверждения
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmDeletionCallback();
    });
  }
}
