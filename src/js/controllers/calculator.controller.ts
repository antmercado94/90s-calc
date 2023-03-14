import { CurCalculation } from "../models/curCalculation.model";
import { Calculated } from "../models/calculated.model";
import { CalculatorView } from "../views/calculator.view";
import { DrawerView } from "../views/drawer.view";
import { Controller } from "./model/Controller";
import Calculation from "../models/model/Calculation";

/** @module CalculatorController */

/**
 * @class
 * Handles calculator functions
 */
export default class CalculatorController extends Controller {
  #curCalculation: CurCalculation = this.models.curCalculation;
  #calculated: Calculated = this.models.calculated;
  #calculator: CalculatorView = this.views.calculator;
  #drawer: DrawerView = this.views.drawer;

  constructor() {
    super();
    this.#init();
  }

  /**
   * Callback used by CalculatorView~addHandlerOperator
   * @param {Operator} operator The operation string.
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlOperator(operator: Operator) {
    const displayValue = this.#calculator.getDisplayValue();
    if (!displayValue) return;

    /** if operator previously selected */
    if (this.#curCalculation.isOperatorReady()) {
      /** calculate result if number2 selected */
      if (this.#calculator.isDisplayReady()) {
        this.#calculator.setDisplayHasChain(true);
        this.controlCalculate();
      }
      if (this.#curCalculation.getCurrent().operator === operator) return;
      /** replace operator */
      this.#curCalculation.setOperator(operator!);
    }

    if (!this.#curCalculation.isOperatorReady()) {
      /** set operator and number1 value */
      const num = this.parseDisplayVal(displayValue);
      this.#curCalculation.setOperator(operator!);
      this.#curCalculation.setNumber1(num);
    }

    this.#calculator.setDisplayReady(false).setDisplayAppend(false);
  }

  /**
   * Callback used by CalculatorView~addHandlerEquals
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlCalculate() {
    if (
      !this.#calculator.isDisplayReady() ||
      !this.#curCalculation.isOperatorReady()
    )
      return;

    /** set number2 value */
    const displayValue = this.#calculator.getDisplayValue();
    const num = this.parseDisplayVal(displayValue!);
    this.#curCalculation.setNumber2(num);

    /** Calculation instance */
    const calculation = new Calculation(this.#curCalculation.getCurrent());
    this.#calculated.addCalculated(calculation);
    this.#drawer.render(calculation);
    this.#calculator
      .setDisplayHasResult(true)
      .setDisplayReady(false)
      .renderValue(calculation.getValue());
    this.reset();

    /** chaining calculations */
    if (this.#calculator.isDisplayChain()) {
      /** set result of previous calculation as number1 value */
      this.#curCalculation.setNumber1(calculation.getValue());
      this.#calculator.setDisplayHasChain(false);
    }
  }

  /**
   * Parses display value and converts to number.
   * @param {string | undefined} value The display value string.
   * @this {Object} CalculatorController instance
   * @returns {number} The display value number.
   */
  parseDisplayVal(displayVal: string) {
    return +(this.#calculator.isDisplayNegative()
      ? `-${displayVal}`
      : displayVal);
  }

  /**
   * Callback used by CalculatorView~addHandlerInterfaceNumber
   * @param {number} num Number value from interface btn.
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlInterfaceNumber(num: number) {
    const curDisplayValue = this.#calculator.getDisplayValue();
    const isPercent = this.#calculator.isDisplayPercent();
    const isAppend = this.#calculator.isDisplayAppend();
    const isNegative = this.#calculator.isDisplayNegative();
    const isReady = this.#calculator.isDisplayReady();
    const isNotBackspaceable = this.#calculator.isBackspaceNull();

    if (curDisplayValue === "0" && num === 0) return;

    if (!isAppend || isNotBackspaceable || isPercent) {
      /** render number from interface btn */
      if (!isReady) this.#calculator.setDisplayReady(true);
      if (isNegative) this.#calculator.clearNegative();
      this.#calculator
        .renderValue(num)
        .setDisplayAppend(true)
        .setBackspaceNull(false)
        .setDisplayHasPercent(false);

      return;
    }
    /** append number from interface btn */
    this.#calculator.renderAppendValue(num);
  }

  /**
   * Callback used by CalculatorView~addHandlerClear
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlClear() {
    this.reset();
    this.#calculator.setDisplayHasResult(false).renderValue(0);
  }

  /**
   * Callback used by CalculatorView~addHandlerPercent
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlPercent() {
    if (
      !this.#calculator.isDisplayReady() ||
      !this.#curCalculation.isOperatorReady() ||
      this.#calculator.isDisplayPercent()
    )
      return;

    /** set number to be used as percentage as number2 value */
    const curDisplayValue = this.#calculator.getDisplayValue()!;
    this.#curCalculation.setNumber2(+curDisplayValue);

    /** handle percentage and render value */
    const percentage = parseFloat(this.#curCalculation.getPercent().toFixed(4));
    this.#calculator.renderValue(percentage).setDisplayHasPercent(true);
  }

  /**
   * Callback used by CalculatorView~addHandlerDecimal
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlDecimal() {
    const curDisplayValue = this.#calculator.getDisplayValue();
    const isDecimal = this.#calculator.isDisplayDecimal();
    const isResult = this.#calculator.isDisplayResult();
    const isReady = this.#calculator.isDisplayReady();
    const isAppend = this.#calculator.isDisplayAppend();
    const isOperatorReady = this.#curCalculation.isOperatorReady();

    if (curDisplayValue === undefined) return;

    if (isDecimal || isResult) {
      /** append decimal if number2 has started being chosen */
      if (!isDecimal && isReady) {
        this.#calculator.renderAppendValue(".");
        return;
      }
      /** display empty decimal ('0.') if number2 has not started being chosen */
      if (!isReady) {
        this.#calculator
          .setDisplayHasResult(false)
          .setDisplayReady(true)
          .setDisplayAppend(true)
          .renderValue(0)
          .renderAppendValue(".");
        return;
      }
      return;
    }
    /** display empty decimal ('0.') if number2 has not started being chosen after selecting operator */
    if (isOperatorReady && !isAppend) {
      this.#calculator
        .setDisplayReady(true)
        .setDisplayAppend(true)
        .renderValue(0)
        .renderAppendValue(".");
      return;
    }
    /** append decimal and set append if cleared display */
    if (curDisplayValue === "0") {
      this.#calculator
        .renderAppendValue(".")
        .setDisplayReady(true)
        .setDisplayAppend(true)
        .setBackspaceNull(false);
      return;
    }
    this.#calculator.renderAppendValue(".");
  }

  /**
   * Callback used by CalculatorView~addHandlerSquareRoot
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  controlSquareRoot() {
    if (this.#calculator.isDisplayClear()) return;
    const value = this.#calculator.getDisplayValue()!;

    /** convert value and render */
    const squareRoot = Math.sqrt(+value);
    this.#calculator.renderValue(squareRoot);
  }

  /**
   * Resets current calculation and interface.
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  reset() {
    this.#curCalculation.resetCalculation();
    this.#calculator
      .setDisplayReady(false)
      .setDisplayAppend(false)
      .setDisplayHasPercent(false)
      .clearNegative();
  }

  /**
   * Sets called functions upon initialization of class instance.
   * @this {Object} CalculatorController instance
   * @returns {void}
   */
  #init() {
    this.#calculator.addHandlerClear(this.controlClear.bind(this));
    this.#calculator.addHandlerOperator(this.controlOperator.bind(this));
    this.#calculator.addHandlerInterfaceNumber(
      this.controlInterfaceNumber.bind(this)
    );
    this.#calculator.addHandlerDecimal(this.controlDecimal.bind(this));
    this.#calculator.addHandlerPercent(this.controlPercent.bind(this));
    this.#calculator.addHandlerSquareRoot(this.controlSquareRoot.bind(this));
    this.#calculator.addHandlerEquals(this.controlCalculate.bind(this));
  }
}
