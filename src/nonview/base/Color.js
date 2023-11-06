import Random from "./Random.js";

export default class Color {
  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${h})`;
  }
  static getRandomHSLA() {
    const h = Random.randomInt(0, 360);
    const s = 100;
    const l = 80;
    const a = 1;
    return Color.hsla(h, s, l, a);
  }

  static getRandomHex() {
    return "#" + Math.floor(Math.random() * 16_777_216).toString(16);
  }

  static getRandomShortHexA() {
    return "#" + Math.floor(Math.random() * 4_096).toString(16) + "4";
  }

  static DEFAULT_COLORS = [
    // Sri Lanka
    "#941E32",
    "#DF7500",
    "#F7B718",
    "#005F56",
    "#000000",
    // Gray
    "#444444",
    "#888888",
    "#cccccc",
    "#dddddd",
    "#eeeeee",
    // Rainbow
    "#FF0000",
    "#FF7F00",
    "#cccc00",
    "#00cc00",
    "#0000cc",
  ];
}
