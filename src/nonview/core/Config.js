var md5 = require("md5");

export default class Config {
  static DEFAULT_VALUE = "Group-Default";
  static HASH_LENGTH = 8;
  static DEFAULT_COLOR = "#cccccc";

  constructor(regionIdToValue, valueToColor) {
    this.regionIdToValue = regionIdToValue;
    this.valueToColor = valueToColor;
  }

  get hash() {
    return md5(this.toString()).substring(0, Config.HASH_LENGTH);
  }

  get regionInfoList() {
    return Object.entries(this.regionIdToValue).map(
      function ([id, value]) {
        return {
          id,
          value,
          fill: this.valueToColor[value],
        };
      }.bind(this)
    );
  }

  get sortedRegionInfoList() {
    return this.regionInfoList.sort((a, b) => a.id.localeCompare(b.id));
  }

  get nRegions() {
    return Object.keys(this.regionIdToValue).length;
  }

  get fileName() {
    return `config-${this.hash}.json`;
  }

  get colorToValue() {
    return Object.fromEntries(
      Object.entries(this.valueToColor).map(([value, color]) => [color, value])
    );
  }

  // Updating

  update(regionId, newInfo) {
    const color = newInfo.fill;
    const colorToValue = this.colorToValue;
    const value =
      colorToValue[color] || "Group-" + Object.keys(colorToValue).length;
    const isAlreadySet = this.regionIdToValue[regionId] === value;
    if (isAlreadySet) {
      this.regionIdToValue[regionId] = Config.DEFAULT_VALUE;
    } else {
      this.regionIdToValue[regionId] = value;
      this.valueToColor[value] = color;
    }
  }

  addRegions(regionIds) {
    for (const id of regionIds) {
      if (this.regionIdToValue[id]) {
        continue;
      }
      this.regionIdToValue[id] = Config.DEFAULT_VALUE;
      this.valueToColor[Config.DEFAULT_VALUE] = Config.DEFAULT_COLOR;
    }
  }

  deleteRegions(regionIds) {
    for (const regionId of regionIds) {
      delete this.regionIdToValue[regionId];
    }
  }

  // Serializing
  toData() {
    return {
      regionIdToValue: this.regionIdToValue,
      valueToColor: this.valueToColor,
    };
  }

  static fromData(data) {
    return new Config(data.regionIdToValue, data.valueToColor);
  }

  toString() {
    return JSON.stringify(this.toData(), null, 2);
  }

  static fromString(str) {
    return Config.fromData(JSON.parse(str));
  }

  // Loaders
  static fromRegionIdList(regionIdList) {
    const regionIdToValue = Object.fromEntries(
      regionIdList.map((id) => [id, Config.DEFAULT_VALUE])
    );
    const valueToColor = { [Config.DEFAULT_VALUE]: Config.DEFAULT_COLOR };
    return new Config(regionIdToValue, valueToColor);
  }

  // Instances
  static PROVINCES = [
    "LK-1",
    "LK-2",
    "LK-3",
    "LK-4",
    "LK-5",
    "LK-6",
    "LK-7",
    "LK-8",
    "LK-9",
  ];

  static DISTRICTS = [
    "LK-11",
    "LK-12",
    "LK-13",
    "LK-21",
    "LK-22",
    "LK-23",
    "LK-31",
    "LK-32",
    "LK-33",
    "LK-41",
    "LK-42",
    "LK-43",
    "LK-44",
    "LK-45",
    "LK-51",
    "LK-52",
    "LK-53",
    "LK-61",
    "LK-62",
    "LK-71",
    "LK-72",
    "LK-81",
    "LK-82",
    "LK-91",
    "LK-92",
  ];

  static DISTRICTS_INTERESTING = [
    "LK-11",
    "LK-23",
    "LK-33",
    "LK-41",
    "LK-52",
    "LK-62",
    "LK-71",
    "LK-91",
  ];

  static DEFAULT = Config.fromRegionIdList(Config.DISTRICTS);
}
