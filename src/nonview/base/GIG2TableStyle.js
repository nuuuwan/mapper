import Color from "./Color";
import FIELD_NAME_TO_COLOR from "../../nonview/constants/FIELD_NAME_TO_COLOR";

export const DEFAULT_COLOR = "gray";
export const DEFAULT_OPACITY = 0.5;
const [MIN_H, MAX_H] = [1, 240];

let adhocValueKeyToColor = {};

export default class GIG2TableStyle {
  static getValueKeyColor(valueKey) {
    if (FIELD_NAME_TO_COLOR[valueKey]) {
      return FIELD_NAME_TO_COLOR[valueKey];
    }
    if (!adhocValueKeyToColor[valueKey]) {
      adhocValueKeyToColor[valueKey] = Color.getRandomHSLA();
    }
    return adhocValueKeyToColor[valueKey];
  }

  static getOpacityFromP(p) {
    const [MIN_OPACITY, MAX_OPACITY] = [0.05, 0.95];
    return MIN_OPACITY + p * (MAX_OPACITY - MIN_OPACITY);
  }

  static getColorFromP(p) {
    const h = parseInt((1 - p) * (MAX_H - MIN_H) + MIN_H);
    const s = 100;
    const l = 50;
    const a = 1;
    return Color.hsla(h, s, l, a);
  }
}
