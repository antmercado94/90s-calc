/** @module LCD */

const numBtns = document.querySelectorAll(".interface-btn[data-value]")!;
const sqRootBtn = document.getElementById("sqRootBtn")!;
const posNegBtn = document.getElementById("posNegBtn")!;
const decBtn = document.getElementById("decBtn")!;

/**
 * @class
 * Calculator display/output
 */
export default class LCD {
  _display = <HTMLSpanElement>document.getElementById("lcdNum")!;
  _negativeIndicator = this._display.previousElementSibling!;
  _displayHasResult: boolean = false;
  _isDisplayClear: boolean = true;
  _calcAppend: boolean = false;
  _isNegative: boolean = false;
  _isPercent: boolean = false;
  _isDecimal: boolean = false;

  constructor() {
    this._setEventListeners();
  }

  /**
   * Displays interface btn value on calculator LCD.
   * @param {Event} e The element event object.
   */
  _displayInterfaceVal(e: Event) {
    const target = e.target as HTMLSpanElement;
    const value = target.dataset.value!;
    this._removePlaceholder();

    /* return if interface val is 0 and display is already 0 */
    if (this.getDisplayValue() === "0" && value === "0") return;

    /* disable percent state if replaced by another number */
    if (this.isPercentToggled()) this.setPercent(false);

    /* replace display value if non-append or full cleared by key backspace */
    if (!this.isDisplayAppend() || this.isBackspaceNull()) {
      if (!this.isDisplayReady()) this.setDisplayReady(true);
      if (this.isDisplayNegative()) this.clearNegative();

      this.replaceDisplayValue(value).setAppend(true)._setBackspaceNull(false);

      return;
    }

    this.appendDisplayValue(value);
  }

  /**
   * Displays number value as string within LCD.
   * @param {number} val The number to be displayed.
   */
  displayResult(val: number) {
    this._removePlaceholder();
    this._display.innerText = `${val}`;
  }

  /**
   * Gets current string value appearing on LCD.
   * @returns {string} The display value.
   */
  getDisplayValue() {
    /* return if display has placeholder */
    if (this._display.hasAttribute("style")) return;

    return this._display.innerText;
  }

  /**
   * Appends a string value to current value on LCD.
   * @param {string} value The value to be appended.
   */
  appendDisplayValue(value: string) {
    this._display.innerText += value;

    return this;
  }

  /**
   * Replaces current string value on LCD.
   * @param {string} value The replacement value.
   */
  replaceDisplayValue(value: string) {
    this._display.innerText = value;

    return this;
  }

  /**
   * Remove placeholder style from display.
   */
  _removePlaceholder() {
    if (!this._display.hasAttribute("style")) return;

    this._display.removeAttribute("style");
  }

  /**
   * Replace display with '0' string value.
   */
  clearDisplay() {
    this._display.innerText = "0";
    this._removePlaceholder();
  }

  /**
   * Append decimal to LCD.
   */
  _appendDecimal() {
    if (this.getDisplayValue() === undefined) return;

    /* replace with empty decimal ('0.') if already decimal or result */
    if (this.isDisplayDecimal() || this.isDisplayResult()) {
      if (!this.isDisplayReady()) {
        this.setDisplayHasResult(false)
          .setDisplayReady(true)
          .setAppend(true)
          .replaceDisplayValue("0")
          .appendDisplayValue(".");

        return;
      }

      return;
    }

    /* replace with empty decimal ('0.') when chaining operators */
    if (this.isOperatorReady() && !this.isDisplayAppend()) {
      this.setDisplayReady(true)
        .setAppend(true)
        .replaceDisplayValue("0")
        .appendDisplayValue(".");

      return;
    }

    /* set append and ready status if display is '0' */
    if (this.getDisplayValue() === "0") {
      this.appendDisplayValue(".")
        .setDisplayReady(true)
        .setAppend(true)
        ._setBackspaceNull(false);

      return;
    }

    this.appendDisplayValue(".");
  }

  /**
   * Transform and replace current display value with square root.
   */
  _transformSquareRoot() {
    if (this.isDisplayClear()) return;

    const convertedValue = String(Math.sqrt(Number(this.getDisplayValue())));

    this.replaceDisplayValue(convertedValue);
  }

  /**
   * Checks the assigned value of 'ready' data attribute.
   * @returns {boolean} The boolean value.
   */
  isDisplayReady() {
    return this._display.dataset.ready === "true" ? true : false;
  }

  /**
   * Checks the assigned value of 'op' data attribute.
   * @returns {boolean} The boolean value.
   */
  isOperatorReady() {
    return this._display.dataset.op === "true" ? true : false;
  }

  /**
   * Checks for calculated result on LCD.
   * @returns {boolean} The boolean value.
   */
  isDisplayResult() {
    return this._displayHasResult;
  }

  /**
   * Checks the current append status.
   * @returns {boolean} The boolean value.
   */
  isDisplayAppend() {
    return this._calcAppend ? true : false;
  }

  /**
   * Checks whether current display value is undefined or '0'.
   * @returns {boolean} The boolean value.
   */
  isDisplayClear() {
    return (
      this.getDisplayValue() === undefined || this.getDisplayValue() === "0"
    );
  }

  /**
   * Check available backspace character status.
   * @returns {boolean} The boolean value.
   */
  isBackspaceNull() {
    return this._display.dataset.bsNull === "true" ? true : false;
  }

  /**
   * Checks the current percent status.
   * @returns {boolean} The boolean value.
   */
  isPercentToggled() {
    return this._isPercent;
  }

  /**
   * Checks the current decimal status.
   * @returns {boolean} The boolean value.
   */
  isDisplayDecimal() {
    if (this.isDisplayClear()) return;

    return this.getDisplayValue()?.includes(".");
  }

  /**
   * Checks the current negative status.
   * @returns {boolean} The boolean value.
   */
  isDisplayNegative() {
    return this._isNegative;
  }

  /**
   * Toggle negative indicator and status.
   */
  _toggleNegative() {
    if (this.isDisplayClear()) return;

    /* display negative indicator */
    this._negativeIndicator.textContent = `${
      this._negativeIndicator.textContent ? "" : "-"
    }`;

    this._isNegative = !this._isNegative;
  }

  /**
   * Remove negative indicator and status.
   */
  clearNegative() {
    this._negativeIndicator.textContent = "";
    this._isNegative = false;
  }

  /**
   * Assigns the 'ready' data attribute value.
   * @param {boolean} bool The boolean value.
   */
  setDisplayReady(bool: boolean) {
    this._display.dataset.ready = String(bool);

    return this;
  }

  /**
   * Enable/disable calculated result status.
   * @param {bool} bool The boolean value.
   */
  setDisplayHasResult(bool: boolean) {
    this._displayHasResult = bool;

    return this;
  }

  /**
   * Assigns the 'op' data attribute value.
   * @param {boolean} bool The boolean value.
   */
  setOperatorReady(bool: boolean) {
    this._display.dataset.op = String(bool);

    return this;
  }

  /**
   * Enable/disable append status.
   * @param {boolean} bool The boolean value.
   */
  setAppend(bool: boolean) {
    this._calcAppend = bool;

    return this;
  }

  /**
   * Enable/disable percent status.
   * @param {boolean} bool The boolean value.
   */
  setPercent(bool: boolean) {
    this._isPercent = bool;

    return this;
  }

  /**
   * Enable/disable available backspace character status.
   * @param {boolean} bool The boolean value.
   */
  _setBackspaceNull(bool: boolean) {
    this._display.dataset.bsNull = String(bool);

    return this;
  }

  /**
   * Sets event listeners to related elements.
   */
  _setEventListeners() {
    /* interface number btns */
    numBtns.forEach(btn => {
      btn.addEventListener("click", this._displayInterfaceVal.bind(this));
    });
    decBtn.addEventListener("click", this._appendDecimal.bind(this));

    /* interface functional btns */
    sqRootBtn.addEventListener("click", this._transformSquareRoot.bind(this));
    posNegBtn.addEventListener("click", this._toggleNegative.bind(this));
  }
}
