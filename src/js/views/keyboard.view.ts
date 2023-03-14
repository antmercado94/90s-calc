import parseKey from "../helpers/parseKey";

/** @module KeyboardView */

/**
 * @class
 * App keyboard functionality
 */
export class KeyboardView {
  #keys: string[] = [];
  #handler: handler;

  /**
   *
   * @param {string[]} keys The array of key names.
   * @param {function():void} handler - Callback function
   */
  constructor(keys: string[], handler: handler) {
    this.#keys = keys;
    this.#handler = handler;
    this.#init();
  }

  /**
   * Handles "keyup" and "keydown" events.
   * @param {KeyboardEvent} e The keyboard event object.
   * @this {Object} KeyboardView instance
   */
  keyEvent(e: KeyboardEvent) {
    e.preventDefault();
    const currentKey = parseKey(e.key);

    if (currentKey === "Backspace") {
      if (e.type === "keydown") this.addHandlerBackspace(this.#handler);
      return;
    }

    this.#keys
      .filter(key => key === currentKey)
      .map(key => {
        const btn = <HTMLElement>(
          document.querySelector(`.interface-btn[data-key='${key}']`)!
        );
        if (e.type === "keydown") this.#triggerClick(btn);
        if (e.type === "keyup") this.#removeClick(btn);
      });
  }

  /**
   * Handles backspace functionality from key event.
   * @param {function(id):void} handler - Called on success.
   * @returns {void}
   */
  addHandlerBackspace(handler: handler) {
    handler();
  }

  /**
   * Force click event on interface btn element.
   * @param {HTMLElement} btn The btn element.
   */
  #triggerClick(btn: HTMLElement) {
    btn.classList.add("active");
    btn.click();
  }

  /**
   * Remove click style on interface btn element.
   * @param {HTMLElement} btn The key name.
   */
  #removeClick(btn: HTMLElement) {
    btn.classList.remove("active");
  }

  /**
   * Sets called functions upon initialization of class instance.
   * @this {Object} KeyboardView instance
   */
  #init() {
    document.addEventListener("keydown", this.keyEvent.bind(this));
    document.addEventListener("keyup", this.keyEvent.bind(this));
  }
}
