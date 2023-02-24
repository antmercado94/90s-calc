/** @module Drawer */

const toggleDrawerBtn = document.getElementById("toggleDrawerBtn")!;

/**
 * @class
 * Drawer functionality
 */
export default class Drawer {
  constructor() {
    toggleDrawerBtn.addEventListener("click", this._toggleDrawer.bind(this));
  }

  /**
   * Toggles drawer CSS class.
   */
  _toggleDrawer() {
    const drawerSection = document.querySelector(".drawer-section")!;
    drawerSection.classList.toggle("drawer-section--open");
  }
}
