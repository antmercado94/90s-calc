/** @module Pattern */

/**
 * @class
 * Represents a Pattern object
 */
export default class Pattern {
  name!: string;
  url: string;

  /**
   *
   * @param {string} url The src url for the pattern image.
   */
  constructor(url: string) {
    this.url = url;
    this.#parsePatternName(this.url);
  }

  /**
   * Parse url for pattern name.
   * @param {string} url The src url for the pattern image.
   * @this {Object} Pattern instance
   * @returns {string} The string with pattern name.
   */
  #parsePatternName(url: string) {
    this.name = url.split("/").pop()!.split(".")[0]!;

    return this.name;
  }
}
