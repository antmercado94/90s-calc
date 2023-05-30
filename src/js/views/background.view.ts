/** @module BackgroundView */

/**
 * @class
 * App background functionality
 */
export class BackgroundView {
  #backgroundEl = <HTMLElement>document.querySelector(".page-background")!;
  #patternEl = <HTMLImageElement>document.querySelector("img[data-pattern]")!;
  #playStateEl = <HTMLElement>document.getElementById("playStateBtn")!;
  #counter = 0;

  constructor() {
    this.#init();
  }

  /**
   * Toggles animation play state CSS class.
   * @this {Object} BackgroundView instance
   * @returns {void}
   */
  #togglePlayState() {
    this.#backgroundEl.classList.toggle("paused");
  }

  /**
   * Restarts animation play state CSS class.
   * @this {Object} BackgroundView instance
   * @returns {this}
   */
  restartAnimation() {
    if (!this.#backgroundEl.classList.contains("paused"))
      this.#backgroundEl.classList.remove("paused");

    return this;
  }

  /**
   * Sets current pattern to image element on calculator interface.
   * @param {Pattern} pattern The pattern object.
   * @this {Object} BackgroundView instance
   * @returns {this}
   */
  setPattern(pattern: Pattern) {
    this.#patternEl.src = pattern.url;
    this.#patternEl.dataset.pattern = pattern.name;

    return this;
  }

  /**
   * Sets background image url to current pattern src.
   * @param {string} src The url of pattern image.
   * @this {Object} BackgroundView instance
   * @returns {this}
   */
  setBackground(src: string) {
    this.#backgroundEl.setAttribute(
      "style",
      `background: url(${src}) repeat 0 0;`
    );

    return this;
  }

  /**
   * Sets number value to counter property.
   * @param {number} num The current counter value.
   * @this {Object} BackgroundView instance
   * @returns {this}
   */
  setCounter(num: number) {
    this.#counter = num;

    return this;
  }

  /**
   * Gets current number value of counter property.
   * @this {Object} BackgroundView instance
   * @returns {number} The counter value.
   */
  getCounter() {
    return this.#counter;
  }

  /**
   * Gets current pattern from image element data attribute on calculator interface.
   * @this {Object} BackgroundView instance
   * @returns {string} The pattern dataset value.
   */
  getCurrentPattern() {
    return this.#patternEl.dataset.pattern;
  }

  /**
   * Sets called functions upon initialization of class instance
   * @this {Object} BackgroundView instance
   */
  #init() {
    this.#playStateEl.addEventListener(
      "click",
      this.#togglePlayState.bind(this)
    );
  }
}
