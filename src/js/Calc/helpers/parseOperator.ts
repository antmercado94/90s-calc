/**
 * A module that returns operator from string.
 * @module parseOperator
 * */

export default function (operation: string) {
  let operator: Operator = null;

  switch (operation) {
    case "add":
      operator = "+";
      break;
    case "subtract":
      operator = "-";
      break;
    case "multiply":
      operator = "*";
      break;
    case "divide":
      operator = "/";
      break;
    default:
      break;
  }
  return operator;
}
