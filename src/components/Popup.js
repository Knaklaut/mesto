// Класс Popup выполняет функции открытия и закрытия всплывающего окна

export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
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

  // Метод _handlePopupClose описывает логику закрытия всплывающего окна при клике по кнопке с крестиком или за пределами всплывающего окна
  _handlePopupClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  // Метод setEventListeners добавляет слушатель событий для закрытия всплывающего окнца
  setEventListeners() {
    this._popupEl.addEventListener('click', (evt) => this._handlePopupClose(evt));
  }
}
