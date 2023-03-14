import { Calculated } from "../models/calculated.model";
import { CalculatorView } from "../views/calculator.view";
import { DrawerView } from "../views/drawer.view";
import { Controller } from "./model/Controller";
import Calculation from "../models/model/Calculation";

/** @module DrawerController */

/**
 * @class
 * Handles drawer functions
 */
export default class DrawerController extends Controller {
  #calculated: Calculated = this.models.calculated;
  #calculator: CalculatorView = this.views.calculator;
  #drawer: DrawerView = this.views.drawer;

  constructor() {
    super();
    this.#init();
  }

  /**
   * Callback used by DrawerView~addHandlerDrawerItem
   * @param {string} id The id string of item element.
   * @this {Object} DrawerController instance
   * @returns {void}
   */
  controlDrawerItem(id: string) {
    /** look for Calculation obj matching item id */
    const drawerItemCalc: Calculation = this.#calculated
      .getCalculated()
      .filter((calc: Calculation) => calc.getId() === id)[0];

    /** render Calculation value */
    const value = drawerItemCalc.getValue();
    this.#calculator
      .setDisplayReady(true)
      .setDisplayAppend(false)
      .renderValue(value);
  }

  /**
   * Callback used by CalculatorView~addHandlerToggleDrawer
   * @this {Object} DrawerController instance
   * @returns {void}
   */
  controlToggleDrawer() {
    this.#drawer.toggleDrawer();
  }

  /**
   * Callback used by CalculatorView~addHandlerClearDrawer
   * @this {Object} DrawerController instance
   * @returns {void}
   */
  controlClearDrawer() {
    this.#drawer.clear();
    this.#calculated.deleteCalculated();
  }

  /**
   * Handles calculated local storage items.
   * @this {Object} DrawerController instance
   * @returns {void}
   */
  #getStorageCalculated() {
    const data = this.#calculated.retrieveCalculated();
    if (!data) return;

    data.forEach((calc: Calculation) => {
      /** re-create Calculation object */
      const newCalc = new Calculation({
        number1: calc.number1,
        number2: calc.number2,
        operator: calc.operator,
      });
      /** add and render */
      this.#calculated.addCalculated(newCalc);
      this.#drawer.render(newCalc);
    });
  }

  /**
   * Sets called functions upon initialization of class instance
   * @this {Object} DrawerController instance
   * @returns {void}
   */
  #init() {
    this.#getStorageCalculated();
    this.#calculator.addHandlerClearDrawer(this.controlClearDrawer.bind(this));
    this.#calculator.addHandlerToggleDrawer(
      this.controlToggleDrawer.bind(this)
    );
    this.#drawer.addHandlerDrawerItem(this.controlDrawerItem.bind(this));
  }
}
