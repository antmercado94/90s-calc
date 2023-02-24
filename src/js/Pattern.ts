/** @module Pattern */

/**
 * @class
 * A pattern used for application background.
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
    this._parsePatternName(this.url);
  }

  /**
   * Parse url for pattern name.
   * @param {string} url The src url for the pattern image.
   * @returns {string} The name of the pattern.
   */
  _parsePatternName(url: string) {
    this.name = url.split("/").pop()!.split(".")[0]!;
    return this.name;
  }
}
