// Класс Popup выполняет функции открытия и закрытия всплывающего окна

export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
    this._closeBtn = this._popupEl.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод open отвечает за открытие всплывающего окна
  open() {
    this._popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод close отвечает за закрытие всплывающего окна
  close() {
    this._popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод _handleEscClose описывает логику закрытия всплывающего окна при нажатии клавиши Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Метод _handleOverlayClose описывает логику закрытия всплывающего окна при клике за пределами всплывающего окна
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  // Метод setEventListeners добавляет слушатели событий иконке закрытия всплывающего окна и самому попапу
  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());
    this._popupEl.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }
}
