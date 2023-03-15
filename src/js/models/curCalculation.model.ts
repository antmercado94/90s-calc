/** @module CurCalculation */

/**
 * @class
 * Maintains current calculation
 */
export class CurCalculation {
  #current: Current = {
    number1: null,
    number2: null,
    operator: null,
  };

  /**
   * Checks for operation within calculation state.
   * @this {Object} CurCalculation instance
   * @returns {boolean} The boolean value.
   */
  isOperatorReady() {
    return this.#current.operator ? true : false;
  }

  /**
   * Gets the current calculation.
   * @this {Object} CurCalculation instance
   * @returns {Current} The current calculation object.
   */
  getCurrent() {
    return this.#current;
  }

  /**
   * Handles percentage conversion.
   * @this {Object} CurCalculation instance
   * @returns {number} The resulting number.
   */
  getPercent() {
    return (this.#current.number1! * this.#current.number2!) / 100;
  }

  /**
   * Sets the mathematical operation.
   * @param {Operator} operation The operator string.
   * @this {Object} CurCalculation instance
   * @returns {void}
   */
  setOperator(operation: Operator) {
    this.#current.operator = operation;
  }

  /**
   * Sets the the first current calculation number.
   * @param {number} num The number value.
   * @this {Object} CurCalculation instance
   * @returns {void}
   */
  setNumber1(num: number) {
    this.#current.number1 = num;
  }

  /**
   * Sets the the second current calculation number.
   * @param {number} num The number value.
   * @this {Object} CurCalculation instance
   * @returns {void}
   */
  setNumber2(num: number) {
    this.#current.number2 = num;
  }

  /**
   * Resets the current calculation.
   * @this {Object} CurCalculation instance
   * @returns {void}
   */
  resetCalculation() {
    this.#current = {
      number1: null,
      number2: null,
      operator: null,
    };
  }
}
