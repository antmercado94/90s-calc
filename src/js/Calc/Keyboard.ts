/** @module Keyboard */

import parseKey from "./helpers/parseKey";

/**
 * @class
 * Keyboard interface
 */
export default class Keyboard {
  /* interface keys */
  _keys: string[] = [];

  /**
   *
   * @param {string[]} keys The array of key names.
   */
  constructor(keys: string[]) {
    this._keys = keys;
    this._setEventListeners();
  }

  /**
   * Handles 'keyup' and 'keydown' events.
   * @param {KeyboardEvent} e The keyboard event object.
   */
  keyEvent(e: KeyboardEvent) {
    e.preventDefault();
    const currentKey = parseKey(e.key);

    if (currentKey === "Backspace") {
      if (e.type === "keydown") this.backspace();
      return;
    }

    this._keys
      .filter(key => key === currentKey)
      .map(key => {
        if (e.type === "keydown") this.triggerClick(key);
        if (e.type === "keyup") this.removeClick(key);
      });
  }

  /**
   * Force click event on interface btn matching 'keydown' key.
   * @param {string} key The key name.
   */
  triggerClick(key: string) {
    let btn = <HTMLSpanElement>(
      document.querySelector(`.interface-btn[data-key='${key}']`)!
    );
    btn.classList.add("active");
    btn.click();
  }

  /**
   * Remove click style on interface btn matching 'keyup' key.
   * @param {string} key The key name.
   */
  removeClick(key: string) {
    let btn = <HTMLSpanElement>(
      document.querySelector(`.interface-btn[data-key='${key}']`)!
    );
    btn.classList.remove("active");
  }

  /**
   * Remove single character from end of string on LCD.
   */
  backspace() {
    const display = <HTMLSpanElement>document.getElementById("lcdNum");
    const currentValue = display.innerText;

    /* return if display has placeholder */
    if (display.hasAttribute("style")) return;

    /* display '0' after non value */
    if (display.innerText.length === 1 || display.innerText === "0.") {
      display.innerText = "0";
      display.dataset.bsNull = "true";
      return;
    }

    display.innerText = currentValue.slice(0, -1);
  }

  /**
   * Sets event listeners to related elements.
   */
  _setEventListeners() {
    document.addEventListener("keydown", this.keyEvent.bind(this));
    document.addEventListener("keyup", this.keyEvent.bind(this));
  }
}
