// Класс Section управляет разметкой других классов и отвечает за ее добавление в DOM

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод renderer отвечает за отрисовку каждого отдельного элемента
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод addItem принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}
