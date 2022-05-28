// Класс Card создает стандартную карточку со ссылкой на изображение и подписью
export default class Card {
  constructor({ data, userId, handleCardClick, handleLikeCard, handleDeleteCard }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._userId = userId;
  }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
  }

  addLike() {
    this._buttonLike.classList.add('card__like-button_active');
    this.isLiked = true;
  }

  removeLike() {
    this._buttonLike.classList.remove('card__like-button_active');
    this.isLiked = false;
  }

  updateLikesCounter(arr) {
    this._likeCounter.textContent = arr.length;
  }

  _checkLikes() {
    if(this._checkCurrentUserLikes()) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  _checkCurrentUserLikes() {
    return this._likes.some(item => {
      item._id === this._userId
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__place').textContent = this._name;
    this._photo = this._element.querySelector('.card__photo');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._buttonDelete = this._element.querySelector('.card__delete-button');
    if(this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
    this._checkLikes();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard(this._cardId, this);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this);
    });
  }
}
