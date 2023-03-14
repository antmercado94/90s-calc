import { v4 as uuidv4 } from "uuid";

/** @module Calculation */

/**
 * @class
 * Represents a Calculation object
 */
export default class Calculation {
  #id: string = uuidv4();
  number1: number;
  number2: number;
  operator: Operator;
  #value!: number;
  #execute = {
    "+": (x: number, y: number) => {
      return x + y;
    },
    "-": (x: number, y: number) => {
      return x - y;
    },
    "*": (x: number, y: number) => {
      return x * y;
    },
    "/": (x: number, y: number) => {
      return x / y;
    },
  };

  /**
   *
   * @param {Current} - Current calculation object
   */
  constructor({ number1, number2, operator }: Current) {
    this.number1 = number1!;
    this.number2 = number2!;
    this.operator = operator;

    this.#setValue();
  }

  /**
   * Perform calculation based on set operator.
   * @this {Object} Calculation instance
   * @returns {void}
   */
  #setValue() {
    if (!this.operator) return;

    this.#value = parseFloat(
      this.#execute[this.operator](this.number1, this.number2).toFixed(11)
    );
  }

  /**
   * Gets value from calculation.
   * @this {Object} Calculation instance
   * @returns {number} The calculated value.
   */
  getValue() {
    return this.#value;
  }

  /**
   * Gets numbers from calculation.
   * @this {Object} Calculation instance
   * @returns {Object} The object of calculation numbers.
   */
  getNums() {
    return { number1: this.number1, number2: this.number2 };
  }

  /**
   * Gets id from calculation.
   * @this {Object} Calculation instance
   * @returns {string} The id string.
   */
  getId() {
    return this.#id;
  }

  /**
   * Gets operator from calculation.
   * @this {Object} Calculation instance
   * @returns {Operator} The operation string.
   */
  getOperator() {
    return this.operator;
  }
}
