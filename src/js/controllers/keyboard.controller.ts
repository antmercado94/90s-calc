import keys from "../lib/keys";
import { Controller } from "./model/Controller";
import { KeyboardView } from "../views/keyboard.view";

/** @module KeyboardController */

/**
 * @class
 * Handles keyboard functions
 */
export default class KeyboardController extends Controller {
  #calculator = this.views.calculator;

  constructor() {
    super();
    this.#init();
  }

  /**
   * Callback used by KeyboardView~addHandlerBackspace
   * @this {Object} KeyboardController instance
   * @returns {void}
   */
  controlBackspace() {
    const curDisplayValue = this.#calculator.getDisplayValue();
    if (curDisplayValue === undefined) return;

    /** if can no longer backspace */
    if (curDisplayValue.length === 1 || curDisplayValue === "0.") {
      this.#calculator.renderValue(0);
      this.#calculator.setBackspaceNull(true);

      return;
    }
    /** render one less string character from display */
    this.#calculator.renderValue(+curDisplayValue.slice(0, -1));
  }

  /**
   * Sets called functions upon initialization of class instance.
   * @this {Object} KeyboardController instance
   * @returns {void}
   */
  #init() {
    const keyboard = new KeyboardView(keys, this.controlBackspace.bind(this));
  }
}
