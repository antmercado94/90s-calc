/**
 * Operator type definition
 * @typedef {string} Operator
 */
type Operator = "+" | "-" | "*" | "/" | null;

/**
 * Pattern type definition
 * @typedef {Object} Pattern
 * @prop {string} name The name of pattern image.
 * @prop {string} url The url of pattern image.
 */
type Pattern = {
  name: string;
  url: string;
};

/**
 * Current type definition
 * @typedef {Object} Current
 * @prop {number | null} number1 The name of pattern image.
 * @prop {number | null} number2 The url of pattern image.
 * @prop { Operator | null} operator
 */
type Current = {
  number1: number | null;
  number2: number | null;
  operator: Operator | null;
};

/** event handler callback interface */
interface handler {
  (any?: any): void;
}

/** image module declarations */
declare module "*.jpg" {
  const value: any;
  export = value;
}
declare module "*.png" {
  const value: any;
  export = value;
}
