var md5 = require('md5');

export default class Config {
  constructor(regionInfoList) {
    this.regionInfoList = regionInfoList;
  }

  get hash() {
    return md5(this.toString());
  }

  // Serializing
  toString() {
    return JSON.stringify(this.regionInfoList, null, 2);
  }

  static fromString(str) {
    return new Config(JSON.parse(str));
  }

  static fromStringSafe(str) {
    try {
      return Config.fromString(str);
    } catch (e) {
      return '';
    }
  }

  // Instances
  static DEFAULT = new Config([
    {
      id: "LK-1",
      label: "Western",
      fill: "#08f8",
    },
    {
      id: "LK-2",
      label: "Central",
      fill: "#0f08",
    },
    {
      id: "LK-3",
      label: "Southern",
      fill: "#f008",
    },
    {
      id: "LK-4",
      label: "Northern",
      fill: "#80f8",
    },
    {
      id: "LK-5",
      label: "Eastern",
      fill: "#f808",
    },
    {
      id: "LK-6",
      label: "North Western",
      fill: "#08f8",
    },
    {
      id: "LK-7",
      label: "North Central",
      fill: "#0f88",
    },
    {
      id: "LK-8",
      label: "Uva",
      fill: "#f0f8",
    },
    {
      id: "LK-9",
      label: "Sabaragamuwa",
      fill: "#80f8",
    },
  ]);
}
