import Calculation from "./model/Calculation";

/** @module Calculated */

/**
 * @class
 * Maintains Calculation objects
 */
export class Calculated {
  #calculated: Calculation[] = [];

  /**
   * Retrieve calculations array.
   * @this {Object} Calculated instance
   * @returns {Calculation[]} The array of Calculation objects.
   */
  getCalculated() {
    return this.#calculated;
  }

  /**
   * Delete all calculated objects.
   * @this {Object} Calculated instance
   * @returns {void}
   */
  deleteCalculated() {
    this.#calculated = [];
    localStorage.removeItem("calculated");
  }

  /**
   * Adds Calculation object to Calculated array and local storage.
   * @param {Calculation} calc The Calculation object.
   * @this {Object} Calculated instance
   * @returns {void}
   */
  addCalculated(calc: Calculation) {
    this.#calculated.push(calc);
    this.persistCalculated();
  }

  /**
   * Sets array of Calculation objects to local storage.
   * @this {Object} Calculated instance
   * @returns {void}
   */
  persistCalculated() {
    localStorage.setItem("calculated", JSON.stringify(this.#calculated));
  }

  /**
   * Gets array of Calculation objects from local storage.
   * @returns {Calculation[] | undefined} The array of Calculation objects if available.
   */
  retrieveCalculated(): Calculation[] | undefined {
    const calculated = JSON.parse(localStorage.getItem("calculated")!);
    if (!calculated) return;

    return calculated;
  }
}
