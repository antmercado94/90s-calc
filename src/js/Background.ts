/** @module Background */

const bg = <HTMLDivElement>document.querySelector(".page-background")!;
const bgChangeBtn = <HTMLSpanElement>document.getElementById("bgChangeBtn")!;
const bgImg = <HTMLImageElement>bgChangeBtn.firstElementChild!;
const playStateBtn = <HTMLSpanElement>document.getElementById("playStateBtn")!;

/**
 * @class
 * Application background
 */
export default class Background {
  _counter = 0;
  _patterns;

  /**
   *
   * @param {Pattern[]} patterns The array of patterns.
   */
  constructor(patterns: Pattern[]) {
    this._patterns = patterns;
    this._setEventListeners();
  }

  /**
   * Toggles animation play state CSS class.
   */
  _toggleAnimation() {
    bg.classList.toggle("paused");
  }

  /**
   * Changes current pattern from an array of patterns.
   */
  _changePattern() {
    if (this.getCurrentPattern() === this._patterns[0].name) this.setCounter(1);

    let pattern = this._patterns[this.getCounter()];

    this.setPattern(pattern)
      .setBackground(pattern.url)
      .setCounter(this.getCounter() + 1);

    /* remove paused animation on pattern change */
    if (bg.classList.contains("paused")) bg.classList.remove("paused");

    this._setLocalStorage(pattern, this.getCounter());

    if (this.getCounter() >= this._patterns.length) this.setCounter(0);
  }

  /**
   * Sets current pattern to image element on calculator interface.
   * @param {Pattern} pattern The pattern object.
   */
  setPattern(pattern: Pattern) {
    bgImg.src = pattern.url;
    bgImg.dataset.pattern = pattern.name;

    return this;
  }

  /**
   * Sets background image url to current pattern src.
   * @param {string} [src=] The url of pattern image.
   */
  setBackground(src: string = this._patterns[0].url) {
    bg.setAttribute("style", `background: url(${src}) repeat 0 0;`);

    return this;
  }

  /**
   * Sets number value to counter property.
   * @param {number} val The current counter value.
   */
  setCounter(val: number) {
    this._counter = val;
  }

  /**
   * Gets current number value of counter property.
   * @returns {number} The counter value.
   */
  getCounter() {
    return this._counter;
  }

  /**
   * Gets current pattern from image element data attribute on calculator interface.
   * @returns {string} The pattern dataset value.
   */
  getCurrentPattern() {
    return bgImg.dataset.pattern;
  }

  /**
   * Sets event listeners to related elements.
   */
  _setEventListeners() {
    bgChangeBtn.addEventListener("click", this._changePattern.bind(this));
    playStateBtn.addEventListener("click", this._toggleAnimation.bind(this));
  }

  /**
   * Sets current pattern to local storage.
   * @param {Pattern} pattern The pattern object.
   * @param {string} count Counter position of pattern.
   */
  _setLocalStorage(pattern: Pattern, count: number) {
    localStorage.setItem("pattern", JSON.stringify({ pattern, count }));
  }
}
