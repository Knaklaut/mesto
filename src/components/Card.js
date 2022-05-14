// Класс Card создает стандартную карточку со ссылкой на изображение и подписью
export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.photobook__element')
    .cloneNode(true);
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
    this._element.querySelector('.photobook__place').textContent = this._name;
    this._photo = this._element.querySelector('.photobook__photo');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.photobook__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.photobook__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }
}
