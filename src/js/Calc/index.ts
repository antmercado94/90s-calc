/** @module Calc */

import parseOperator from "./helpers/parseOperator";
import Calculation from "./Calculation";
import LCD from "./LCD";

const opBtns = document.querySelectorAll(".operator")!;
const clearBtn = document.getElementById("clearBtn")!;
const perBtn = document.getElementById("perBtn")!;
const eqBtn = document.getElementById("eqBtn")!;
const list = document.getElementById("drawerList")!;
const clearListBtn = document.getElementById("clearListBtn")!;

/**
 * @class
 * Base of calculator functionality
 */
export default class Calc {
  _readyNums: number[] = [];
  _operator!: Operator;
  _calculations: Calculation[] = [];
  lcd: LCD;

  constructor() {
    this.lcd = new LCD();
    this._setEventListeners();
  }

  /**
   * Sets operator and first ready number.
   * @param {Event} e The event object.
   */
  _ready(e: Event) {
    const target = e.target as HTMLSpanElement;
    const operation = target.dataset.op!;

    /* return if display has no value */
    if (!this.lcd.getDisplayValue()) return;

    /* if operator previously selected */
    if (this.lcd.isOperatorReady()) {
      /* if ready for calculation */
      if (this.lcd.isDisplayReady()) {
        this._complete();
      }
      /* replace current operator */
      this._setOperator(operation);
    }

    if (!this.lcd.isOperatorReady()) {
      this._setOperator(operation)._setReadyNum();
    }

    this.lcd.setDisplayReady(false).setOperatorReady(true).setAppend(false);
  }

  /**
   * Completes the calculation.
   */
  _complete() {
    if (!this.lcd.isDisplayReady() || !this.lcd.isOperatorReady()) return;

    this._setReadyNum();

    /* convert to percentage if toggled */
    if (this.lcd.isPercentToggled()) {
      this._handlePercent(this._readyNums[0], this._readyNums[1]);

      return;
    }

    /* create new calculation object */
    const calculation = new Calculation(this._readyNums, this.getOperator());

    this.addCalc(calculation)._renderCalc(calculation);

    this.lcd
      .setDisplayHasResult(true)
      .setDisplayReady(false)
      .displayResult(calculation.getValue());

    this._setLocalStorage()._resetCalc();
  }

  /**
   * Gets the currently set operator.
   */
  getOperator() {
    return this._operator;
  }

  /**
   * Retrieve calculations array.
   * @returns {Calculation[]} The array of calculation objects.
   */
  getCalcs() {
    return this._calculations;
  }

  /**
   * Gets percentage of 1st ready num.
   */
  _getPercent() {
    this.lcd.setPercent(true);
    this._complete();
  }

  /**
   * Sets the current basic mathematical operation.
   * @param {string} operation The operator string.
   */
  _setOperator(operation: string) {
    this._operator = parseOperator(operation);

    return this;
  }

  /**
   * Sets display number values to an array.
   */
  _setReadyNum() {
    this._readyNums = [
      ...this._readyNums,
      this._parseDisplayVal(this.lcd.getDisplayValue()),
    ];

    return this;
  }

  /**
   * Clears current calculator status.
   */
  _resetCalc() {
    this._readyNums = [];
    this._operator = null;
    this.lcd
      .setDisplayReady(false)
      .setOperatorReady(false)
      .setAppend(false)
      .clearNegative();
  }

  /**
   * Clears current calculator status and resets LCD.
   */
  _resetCalcAndInterface() {
    this._resetCalc();
    this.lcd.setDisplayHasResult(false).clearDisplay();
  }

  /**
   * Adds calculation object to array.
   * @param {Calculation} calc The calculation object.
   */
  addCalc(calc: Calculation) {
    this._calculations.push(calc);

    return this;
  }

  /**
   * Parses display value and converts to number.
   * @param {string | undefined} value The display value string.
   * @returns {number} The display value number.
   */
  _parseDisplayVal(value: string | undefined) {
    return this.lcd.isDisplayNegative() ? Number(`-${value}`) : Number(value);
  }

  /**
   * Handles percentage conversion and displayed output of numbers.
   */
  _handlePercent(num1: number, num2: number) {
    const percentage = (num1 * num2) / 100;

    this.lcd.displayResult(parseFloat(percentage.toFixed(4)));

    const prevOperator = this.getOperator(),
      prevCalcNum = num1;

    this._resetCalc();

    this._operator = prevOperator;
    this._readyNums[0] = prevCalcNum;

    this.lcd.setDisplayReady(true).setOperatorReady(true).setPercent(false);
  }

  /**
   * Displays calculation to list.
   * @param {Calculation} calculation The calculation object.
   */
  _renderCalc(calculation: Calculation) {
    const { num1, num2 } = calculation.getNums(),
      operator = calculation.getOperator(),
      id = calculation.getId();

    let span = `
    <span>${num1} ${operator} ${num2}</span>
`;
    let item = document.createElement("li");
    item.classList.add("drawer-item");
    item.dataset.id = `${id}`;
    item.insertAdjacentHTML("beforeend", span);
    item.addEventListener("click", this._displayCalculationVal.bind(this));

    list.insertAdjacentElement("afterbegin", item);
  }

  /**
   * Gets calculations from local storage and displays to list.
   * @param {Calculation[]} data The array of ls calculation objects.
   */
  getLsCalcs(data: Calculation[]) {
    data.forEach(lsCalc => {
      let readyNums = [lsCalc._num1, lsCalc._num2];
      let operator = lsCalc._operator;

      /* re-create objects */
      let newCalc = new Calculation(readyNums, operator);

      this.addCalc(newCalc)._renderCalc(newCalc);
    });
  }

  /**
   * Displays calculation item value on LCD.
   * @param {Event} e The event object.
   */
  _displayCalculationVal(e: Event) {
    const target = e.target as HTMLSpanElement;
    const id = target.parentElement?.dataset.id;

    const calculation: Calculation = this.getCalcs().filter(
      (calc: Calculation) => calc.getId() === id
    )[0];

    this.lcd
      .setDisplayReady(true)
      .setAppend(false)
      .displayResult(calculation.getValue());
  }

  /**
   * Clears all calculation items from list.
   */
  _clearDrawer() {
    list.innerHTML = "";
    this._calculations = [];
    localStorage.removeItem("calculations");
  }

  /**
   * Sets calculations to local storage.
   */
  _setLocalStorage() {
    localStorage.setItem("calculations", JSON.stringify(this.getCalcs()));

    return this;
  }

  /**
   * Sets event listeners to related elements.
   */
  _setEventListeners() {
    clearBtn.addEventListener("click", this._resetCalcAndInterface.bind(this));
    clearListBtn.addEventListener("click", this._clearDrawer.bind(this));
    perBtn.addEventListener("click", this._getPercent.bind(this));
    eqBtn.addEventListener("click", this._complete.bind(this));
    opBtns.forEach(btn => {
      btn.addEventListener("click", this._ready.bind(this));
    });
  }
}
