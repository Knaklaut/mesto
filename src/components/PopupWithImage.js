import Popup from "./Popup.js";

// Класс PopupWithImage наследует от класса Popup и перезаписывает функцию open() родительского класса для работы с попапом, содержащим увеличенное фото
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoEl = this._popupEl.querySelector('.popup__photo');
    this._photoTitle = this._popupEl.querySelector('.popup__photo-title');
  }

  // Метод open расширяет родительский метод и добавляет ему функциональность, которая позволяет обрабатывать src исходного изображения и вставлять подпись
  open(title, link) {
    this._photoEl.src = link;
    this._photoEl.alt = title;
    this._photoTitle.textContent = title;
    super.open();
  }
}
