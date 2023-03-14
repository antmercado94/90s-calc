import * as controllers from "./controllers";

export default class App {
  constructor() {
    this.init();
  }

  /**
   * Initialize controller instances
   * @returns {void}
   */
  init(): void {
    const calculator = new controllers.Calculator();
    const drawer = new controllers.Drawer();
    const pattern = new controllers.Pattern();
    const keyboard = new controllers.Keyboard();
  }
}
