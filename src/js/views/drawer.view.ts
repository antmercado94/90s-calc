import Calculation from "../models/model/Calculation";

/** @module DrawerView */

/**
 * @class
 * App drawer functionality
 */
export class DrawerView {
  #parentEl = document.querySelector(".drawer-section")!;
  #listEl = document.querySelector(".drawer-list")!;
  #data!: Calculation;

  /**
   * Handles drawer list item click event.
   * @param {function(id):void} handler - Called on success.
   * @this {Object} DrawerView instance
   * @returns {void}
   */
  addHandlerDrawerItem(handler: handler) {
    this.#parentEl.addEventListener("click", function (e) {
      const item = (e.target as Element).closest(".drawer-item");
      if (!item) return;

      const id = (item as HTMLElement).dataset.id!;
      handler(id);
    });
  }

  /**
   * Renders the received Calculation object to the drawer list.
   * @param {Calculation} data The Calculation object.
   * @this {Object} DrawerView instance
   * @returns {void}
   */
  render(data: Calculation) {
    if (!data) return;

    this.#data = data;
    const markup = this.#generateMarkup();
    this.#listEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Clears all drawer list elements
   * @this {Object} DrawerView instance
   * @returns {void}
   */
  clear() {
    this.#listEl!.innerHTML = "";
  }

  /**
   * Toggles open/close class on drawer element.
   * @this {Object} DrawerView instance
   * @returns {void}
   */
  toggleDrawer() {
    this.#parentEl.classList.toggle("drawer-section--open");
  }

  /**
   * Generates markup from Calculation object data.
   * @this {Object} DrawerView instance
   * @returns {string} A markup string.
   */
  #generateMarkup() {
    const id = this.#data.getId();
    const { number1, number2 } = this.#data.getNums();
    const operator = this.#data.getOperator();

    return `
      <li class="drawer-item" data-id="${id}">
        <span>${number1} ${operator} ${number2}</span>
      </li>
    `;
  }
}
