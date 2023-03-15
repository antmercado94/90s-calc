import Pattern from "./model/Pattern";

/** @module Patterns */

/**
 * @class
 * Maintains pattern objects
 */
export class Patterns {
  #patterns: Pattern[] = [];

  /**
   * Adds pattern object to array.
   * @param {Pattern} pattern The pattern object.
   * @this {Object} Patterns instance
   * @returns {void}
   */
  addPattern(pattern: Pattern) {
    this.#patterns.push(pattern);
  }

  /**
   * Retrieve patterns state.
   * @this {Object} Patterns instance
   * @returns {Pattern[]} The array of pattern objects.
   */
  getPatterns() {
    return this.#patterns;
  }

  /**
   * Sets current pattern to local storage.
   * @param {Pattern} pattern The pattern object.
   * @param {string} count Counter position of pattern.
   * @this {Object} Patterns instance
   * @returns {void}
   */
  persistPattern(pattern: Pattern, count: number) {
    localStorage.setItem("pattern", JSON.stringify({ pattern, count }));
  }

  /**
   * Gets pattern from local storage.
   * @returns {{pattern: Pattern, count: number} | undefined} The pattern storage object if available.
   */
  retrieveStoragePattern() {
    const storage: { pattern: Pattern; count: number } = JSON.parse(
      localStorage.getItem("pattern")!
    );
    if (!storage) return;

    return storage;
  }
}
