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

  static hexToRGBVec(hexColor) {
    let r = 0,
      g = 0,
      b = 0;
    if (hexColor.length === 4) {
      r = "0x" + hexColor[1] + hexColor[1];
      g = "0x" + hexColor[2] + hexColor[2];
      b = "0x" + hexColor[3] + hexColor[3];
    } else if (hexColor.length === 7) {
      r = "0x" + hexColor[1] + hexColor[2];
      g = "0x" + hexColor[3] + hexColor[4];
      b = "0x" + hexColor[5] + hexColor[6];
    }
    return [r, g, b];
  }

  static rgbVecToHSLVec([r, g, b]) {
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
  }

  static hslVecToRGBVec(hsl) {
    let h = hsl[0] / 360;
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  static rgbVecToHexColor(rgb) {
    let r = rgb[0].toString(16);
    let g = rgb[1].toString(16);
    let b = rgb[2].toString(16);

    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    return "#" + r + g + b;
  }
  static hslVecToHexColor([h, s, l]) {
    return Color.rgbVecToHexColor(Color.hslVecToRGBVec([h, s, l]));
  }
  static expand(hexColor) {
    const [r, g, b] = Color.hexToRGBVec(hexColor);
    const [h, s, l] = Color.rgbVecToHSLVec([r, g, b]);

    const I_LIST = [0, 1, 2, 3];
    const N = I_LIST.length;
    const lVaryList = I_LIST.map((i) =>
      Color.hslVecToHexColor([h, s, 90 - (i * 80) / N])
    );
    const complimentList = I_LIST.map((i) =>
      Color.hslVecToHexColor([(h + (360 / N) * i) % 360, s, l])
    );
    return [].concat(lVaryList, complimentList);
  }

  static getCompliment(hexColor) {
    if (!hexColor) {
      return "#111";
    }
    const [r, g, b] = Color.hexToRGBVec(hexColor);
    const l = Color.rgbVecToHSLVec([r, g, b])[2];
    if (l < 40) {
      return "#eee";
    }
    return "#111";
  }

  // Auto Color

  static autoColor(overlapKeyPairs, keyList) {
    const [MIN_N_COLORS, MAX_N_COLORS] = [4, 4];
    const MAX_ATTEMPTS = 100;
    let minNOverlaps = Infinity;
    let bestKeyToColor = null;
    let bestOverlapPairs = null;

    


    for (let nColors = MIN_N_COLORS; nColors <= MAX_N_COLORS; nColors++) {
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        let keyToIColor = {};
        let overlapPairs = [];
        // Assign Color
        for (const key of keyList) {
          keyToIColor[key] = Random.randomInt(0, nColors);
        }

        // check if coloring valid
        for (const [key1, key2] of overlapKeyPairs) {
          if (keyToIColor[key1] === keyToIColor[key2]) {
            overlapPairs.push([key1, key2]);
          }
        }
        const nOverlaps = overlapPairs.length;

        if (nOverlaps < minNOverlaps) {
          minNOverlaps = nOverlaps;
          bestKeyToColor = keyToIColor;
          bestOverlapPairs = overlapPairs;
        }

        if (nOverlaps === 0) {
          console.debug("Solution", { nColors, keyToIColor });
          break;
        }
      }
      if (minNOverlaps ===0) {
        break;
      }
      console.debug("Partial Solution", { nColors, bestOverlapPairs });
    }

    return Object.fromEntries(
      Object.entries(bestKeyToColor).map(([key, iColor]) => [
        key,
        Color.DEFAULT_COLORS[iColor],
      ])
    );
  }

  // Default Colors

  static DEFAULT_COLORS = [
    // Sri Lanka
    "#941E32",
    "#DF7500",
    "#F7B718",
    "#005F56",
    // Gray
    "#000000",
    "#888888",
    "#cccccc",
    "#eeeeee",
  ];

  static randomDefaultColor(nColors) {
    return Color.DEFAULT_COLORS[Random.randomInt(0, nColors)];
  }
}
