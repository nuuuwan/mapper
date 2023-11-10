
import {Geo, Color} from "../base"
var md5 = require("md5");

export default class Config {
  static DEFAULT_VALUE = "Group-Default";
  static HASH_LENGTH = 8;
  static DEFAULT_COLOR = "#cccccc";

  constructor(name, regionIdToValue, valueToColor) {
    this.name = name;
    this.regionIdToValue = regionIdToValue;
    this.valueToColor = valueToColor;
  }

  get hash() {
    return md5(this.toString()).substring(0, Config.HASH_LENGTH);
  }

  get regionIdList() {
     return Object.keys(this.regionIdToValue);
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

  get colors() {
    return Object.values(this.valueToColor);
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
  static fromRegionIdList(name, regionIdList) {
    const regionIdToValue = Object.fromEntries(
      regionIdList.map((id) => [id, Config.DEFAULT_VALUE])
    );
    const valueToColor = { [Config.DEFAULT_VALUE]: Config.DEFAULT_COLOR };
    return new Config(name, regionIdToValue, valueToColor);
  }

  // Utilities
  async autoColor() {
    const regionIdList = this.regionIdList;
    const overlapPairs = await Geo.getOverlapGraph(regionIdList);
    const regionIdToColor = Color.autoColor(overlapPairs, regionIdList);
    
    Object.entries(regionIdToColor).forEach(function ([regionId, color]) {
      this.update(regionId, { fill: color });
    }.bind(this));
  }

}
