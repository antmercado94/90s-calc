import * as images from "./lib/images";
import keys from "./lib/keys";
import Pattern from "./Pattern";
import Calc from "./Calc";
import Keyboard from "./Calc/Keyboard";
import Drawer from "./Drawer";
import Background from "./Background";

export default class App {
  _patterns: Pattern[] = [];
  calculator: Calc;
  keyboard: Keyboard;
  drawer: Drawer;
  bg: Background;

  constructor() {
    this._generatePatterns();

    this.calculator = new Calc();
    this.keyboard = new Keyboard(keys);
    this.drawer = new Drawer();
    this.bg = new Background(this.getPatterns());

    this._setLsPattern();
    this._setLsCalcs();
  }

  /**
   * Push pattern objects into array.
   */
  _generatePatterns() {
    Object.values(images).forEach(image => {
      this.addPattern(this._createPattern(image));
    });
  }

  /**
   * Create pattern objects.
   * @param {string} imageSrc The src url of the image.
   * @returns {Pattern} The pattern object.
   */
  _createPattern(imageSrc: string) {
    return new Pattern(imageSrc);
  }

  /**
   * Adds pattern object to array.
   * @param {Pattern} pattern pattern object.
   */
  addPattern(pattern: Pattern) {
    this._patterns.push(pattern);
  }

  /**
   * Retrieve patterns array.
   * @returns {Pattern[]} The array of pattern objects.
   */
  getPatterns() {
    return this._patterns;
  }

  /**
   * Set calculations retrieved from local storage.
   */
  _setLsCalcs() {
    const calcs = JSON.parse(localStorage.getItem("calculations")!);
    if (!calcs) return;

    this.calculator.getLsCalcs(calcs);
  }

  /**
   * Set pattern retrieved from local storage.
   */
  _setLsPattern() {
    const item = JSON.parse(localStorage.getItem("pattern")!);

    this.bg.setBackground(!item ? undefined : item.pattern.url);

    if (!item) return;

    this.bg
      .setPattern(item.pattern)
      .setCounter(item.count === this.getPatterns().length ? 0 : item.count);
  }
}
