// Класс Section управляет разметкой других классов и отвечает за ее добавление в DOM

export default class Section {
  constructor({ renderer }, cardSelector) {
    this._renderer = renderer;
    this._card = document.querySelector(cardSelector);
  }

  // Метод renderer отвечает за отрисовку каждого отдельного элемента
  renderItems(arr, id) {
    arr.forEach(item => {
      this._renderer(item, id);
    });
  }

  // Метод addItem принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._card.prepend(item);
  }
}
