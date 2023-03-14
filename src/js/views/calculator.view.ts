/** @module CalculatorView */

/**
 * @class
 * App calculator functionality
 */
export class CalculatorView {
  display = <HTMLElement>document.getElementById("lcdNum")!;
  interface = <HTMLElement>document.querySelector(".interface")!;
  negativeIndicator = <HTMLElement>this.display.previousElementSibling!;

  constructor() {
    this.#init();
  }

  /**
   * Handles operator btn click event.
   * @param {function(operation):void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerOperator(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest(".operator");
      if (!btn) return;

      const operation = (btn as HTMLElement).dataset.key;
      handler(operation);
    });
  }

  /**
   * Handles number btn click event.
   * @param {function(value):void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerInterfaceNumber(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest(".interface-btn[data-value]");
      if (!btn) return;

      const value = (btn as HTMLElement).dataset.value;
      handler(value);
    });
  }

  /**
   * Handles decimal btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerDecimal(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#decBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles clear drawer btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerClearDrawer(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#clearListBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles open/close drawer btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerToggleDrawer(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#toggleDrawerBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles clear btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerClear(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#clearBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles percent btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerPercent(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#perBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles square root btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerSquareRoot(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#sqRootBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles equals btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerEquals(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#eqBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles change pattern btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerChangePattern(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#bgChangeBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Handles positive/negative btn click event.
   * @param {function():void} handler - Called on success.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  addHandlerToggleNegative(handler: handler) {
    this.interface.addEventListener("click", function (e: Event) {
      const btn = (e.target as Element).closest("#posNegBtn");
      if (!btn) return;

      handler();
    });
  }

  /**
   * Removes placeholder inline style from display.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  #removePlaceholder() {
    if (!this.display.hasAttribute("style")) return;

    this.display.removeAttribute("style");
  }

  /**
   * Toggles negative indicator and status.
   * @this {Object} CalculatorView instance
   * @returns {void}
   */
  #toggleNegative() {
    if (this.isDisplayClear()) return;

    /* display negative indicator */
    this.negativeIndicator.textContent = `${
      this.negativeIndicator.textContent ? "" : "-"
    }`;
    this.setDisplayHasNegative(!this.isDisplayNegative());
  }

  /**
   * Displays number on calculator.
   * @param {number} val The number to be displayed.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  renderValue(val: number) {
    this.#removePlaceholder();
    this.display.innerText = `${val}`;

    return this;
  }

  /**
   * Appends a number or decimal on calculator display.
   * @param {number | "."} val The number or decimal to be displayed.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  renderAppendValue(val: number | ".") {
    this.display.innerText += val;

    return this;
  }

  /**
   * Gets currently displayed calculator string.
   * @this {Object} CalculatorView instance
   * @returns {string} The display value string.
   */
  getDisplayValue() {
    /* return if display has placeholder */
    if (this.display.hasAttribute("style")) return;

    return this.display.innerText;
  }

  /**
   * Checks if displayed value contains a decimal.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayDecimal() {
    if (this.isDisplayClear()) return;

    return this.getDisplayValue()?.includes(".");
  }

  /**
   * Checks the assigned value of "ready" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayReady() {
    return this.display.dataset.ready === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "append" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayAppend() {
    return this.display.dataset.append === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "percent" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayPercent() {
    return this.display.dataset.percent === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "negative" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayNegative() {
    return this.display.dataset.negative === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "result" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayResult() {
    return this.display.dataset.result === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "chain" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayChain() {
    return this.display.dataset.chain === "true" ? true : false;
  }

  /**
   * Checks the assigned value of "bsNull" data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isBackspaceNull() {
    return this.display.dataset.bsNull === "true" ? true : false;
  }

  /**
   * Remove negative indicator from display and set false data attribute.
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  clearNegative() {
    this.negativeIndicator.textContent = "";
    this.display.dataset.negative = "false";

    return this;
  }

  /**
   * Checks whether current display value is undefined or "0".
   * @this {Object} CalculatorView instance
   * @returns {boolean} The boolean value.
   */
  isDisplayClear() {
    return (
      this.getDisplayValue() === undefined || this.getDisplayValue() === "0"
    );
  }

  /**
   * Assigns the "ready" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayReady(bool: boolean) {
    this.display.dataset.ready = `${bool}`;

    return this;
  }

  /**
   * Assigns the "append" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayAppend(bool: boolean) {
    this.display.dataset.append = `${bool}`;

    return this;
  }

  /**
   * Assigns the "result" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayHasResult(bool: boolean) {
    this.display.dataset.result = `${bool}`;

    return this;
  }

  /**
   * Assigns the "percent" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayHasPercent(bool: boolean) {
    this.display.dataset.percent = `${bool}`;

    return this;
  }

  /**
   * Assigns the "negative" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayHasNegative(bool: boolean) {
    this.display.dataset.negative = `${bool}`;

    return this;
  }

  /**
   * Assigns the "chain" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setDisplayHasChain(bool: boolean) {
    this.display.dataset.chain = `${bool}`;

    return this;
  }

  /**
   * Assigns the "bsNull" data attribute value.
   * @this {Object} CalculatorView instance
   * @returns {this}
   */
  setBackspaceNull(bool: boolean) {
    this.display.dataset.bsNull = `${bool}`;

    return this;
  }

  /**
   * Sets called functions upon initialization of class instance
   * @this {Object} CalculatorView instance
   */
  #init() {
    this.addHandlerToggleNegative(this.#toggleNegative.bind(this));
  }
}
