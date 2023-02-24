/**
 * A module that parses for certain keypress keys.
 * @module parseKey
 * */

export default function (key: string) {
  let currentKey = key;

  if (key === "Enter") currentKey = "=";
  if (key === " ") currentKey = "Escape";

  return currentKey;
}
