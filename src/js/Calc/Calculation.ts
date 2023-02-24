/** @module Calculation */

import { v4 as uuidv4 } from "uuid";

/**
 * @class
 * Represents a calculation object
 */
export default class Calculation {
  _id: string = uuidv4();
  _num1: number;
  _num2: number;
  _operator: Operator;
  _value!: number;
  _execute = {
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
   * @param {number[]} readyNums The array of numbers to be calculation.
   * @param {Operator} operator The type of operation.
   */
  constructor(readyNums: number[], operator: Operator) {
    this._num1 = readyNums[0];
    this._num2 = readyNums[1];
    this._operator = operator;

    this._setValue();
  }

  /**
   * Perform calculation based on set operator.
   */
  _setValue() {
    if (!this._operator) return;

    this._value = parseFloat(
      this._execute[this._operator](this._num1, this._num2).toFixed(11)
    );
  }

  /**
   * Gets value from calculation.
   * @returns {number} The calculated value.
   */
  getValue() {
    return this._value;
  }

  /**
   * Gets numbers from calculation.
   * @returns {object} The numbers object.
   */
  getNums() {
    return { num1: this._num1, num2: this._num2 };
  }

  /**
   * Gets id from calculation.
   * @returns {string} The id string.
   */
  getId() {
    return this._id;
  }

  /**
   * Gets operator from calculation.
   * @returns {Operator} The operation.
   */
  getOperator() {
    return this._operator;
  }
}
