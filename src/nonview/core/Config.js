export default class Config {
  static getDefault() {
    return {
      regionInfoIndex: {
        "LK-1": {
          label: "Western",
          fill: "#08f",
        },
        "LK-3": {
          label: "Southern",
          fill: "#f80",
        },
        "LK-4": {
          label: "Northern",
          fill: "#0f8",
        },
        "LK-5": {
          label: "Eastern",
          fill: "#80f",
        },
        "LK-6": {
          label: "North Western",
          fill: "#f0f",
        },
      },
    };
  }
  static getDefaultJSON() {
    return JSON.stringify(Config.getDefault(), null, 2);
  }
}
