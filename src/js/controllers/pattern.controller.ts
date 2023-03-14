import * as patternImg from "../lib/patterns";
import { Controller } from "./model/Controller";
import { Patterns } from "../models/patterns.model";
import { BackgroundView } from "../views/background.view";
import { CalculatorView } from "../views/calculator.view";
import Pattern from "../models/model/Pattern";

/** @module PatternController */

/**
 * @class
 * Handles pattern functions
 */
export default class PatternController extends Controller {
  #patterns: Patterns = this.models.patterns;
  #background: BackgroundView = this.views.background;
  #calculator: CalculatorView = this.views.calculator;

  constructor() {
    super();
    this.#init();
  }

  /**
   * Callback used by CalculatorView~addHandlerChangePattern
   * @this {Object} PatternController instance
   * @returns {void}
   */
  controlChangePattern() {
    const curPattern = this.#background.getCurrentPattern();
    const patterns: Pattern[] = this.#patterns.getPatterns();
    const firstPattern = patterns[0].name;

    if (curPattern === firstPattern) this.#background.setCounter(1);
    if (this.#background.getCounter() >= patterns.length)
      /** reset pattern position */
      this.#background.setCounter(0);

    /** next pattern */
    const count = this.#background.getCounter();
    const newPattern = patterns[count];

    /** apply next pattern */
    this.#background
      .setPattern(newPattern)
      .setBackground(newPattern.url)
      .setCounter(count + 1)
      .restartAnimation();
    this.#patterns.persistPattern(newPattern, count);
  }

  /**
   * Generate Pattern objects from images.
   * @this {Object} PatternController instance
   * @returns {void}
   */
  #generatePatterns() {
    Object.values(patternImg).forEach(img =>
      this.#patterns.addPattern(new Pattern(img))
    );
  }

  /**
   * Handles pattern local storage item.
   * @this {Object} PatternController instance
   * @returns {void}
   */
  #getStoragePattern() {
    const storage = this.#patterns.retrieveStoragePattern();
    const patterns: Pattern[] = this.#patterns.getPatterns();

    /** set first or local storage pattern as background image */
    this.#background.setBackground(
      !storage ? patterns[0].url : storage.pattern.url
    );

    if (!storage) return;

    /** set storage pattern as current pattern */
    this.#background
      .setPattern(storage.pattern)
      .setCounter(storage.count === patterns.length ? 0 : storage.count + 1);
  }

  /**
   * Sets called functions upon initialization of class instance.
   * @this {Object} PatternController instance
   * @returns {void}
   */
  #init() {
    this.#generatePatterns();
    this.#getStoragePattern();
    this.#calculator.addHandlerChangePattern(
      this.controlChangePattern.bind(this)
    );
  }
}
