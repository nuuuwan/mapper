export default class Config {
  constructor(regionInfoList) {
    this.regionInfoList = regionInfoList;
  }

  // Serializing
  toString() {
    return JSON.stringify(this.regionInfoList, null, 2);
  }

  static fromString(str) {
    return new Config(JSON.parse(str));
  }

  // Instances
  static DEFAULT = new Config([
    {
      id: "LK-1",
      label: "Western",
      fill: "#08f8",
    },
    {
      id: "LK-3",
      label: "Southern",
      fill: "#f808",
    },
    {
      id: "LK-4",
      label: "Northern",
      fill: "#0f88",
    },
    {
      id: "LK-5",
      label: "Eastern",
      fill: "#80f8",
    },
    {
      id: "LK-6",
      label: "North Western",
      fill: "#f0f8",
    },
  ]);
}
