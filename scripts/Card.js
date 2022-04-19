// Класс Card создает стандартную карточку со ссылкой на изображение и подписью

export class Card {
  constructor(data, cardSelector, increasePhoto) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._increasePhoto = increasePhoto;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.photobook__element')
    .cloneNode(true);
    return cardElement;
  }

  _handleLikeCard() {
    const cardLiked = this._element.querySelector('.photobook__like-button');
    cardLiked.classList.toggle('photobook__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.photobook__photo').src = this._link;
    this._element.querySelector('.photobook__photo').alt = this._name;
    this._element.querySelector('.photobook__place').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photobook__photo').addEventListener('click', () => {
      this._increasePhoto(this._name, this._link);
    });

    this._element.querySelector('.photobook__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.photobook__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }
}
