import { Color } from "../../nonview/base";
var md5 = require("md5");

export default class Config {
  constructor(regionInfoIdx) {
    this.regionInfoIdx = regionInfoIdx;
  }

  get hash() {
    return md5(this.toString());
  }

  get regionInfoList() {
    return Object.entries(this.regionInfoIdx).map(([id, info]) =>
      Object.assign({}, info, { id })
    );
  }

  get sortedRegionInfoList() {
    return this.regionInfoList.sort((a, b) => a.id.localeCompare(b.id));
  }

  get nRegions() {
    return this.regionInfoList.length;
  }

  // Updating

  update(regionID, newInfo) {
    this.regionInfoIdx[regionID] = newInfo;
  }

  setRegionIDs(regionIDList) {
    this.regionInfoIdx = Config.regionIDListToIdx(regionIDList);
  }

  // Serializing / Loaders
  toData() {
    return this.regionInfoIdx;
  }

  static fromData(data) {
    return new Config(data);
  }

  toString() {
    return JSON.stringify(this.toData(), null, 2);
  }

  static fromString(str) {
    return Config.fromData(JSON.parse(str));
  }

  static fromStringSafe(str) {
    try {
      return Config.fromString(str);
    } catch (e) {
      return "";
    }
  }

  static initItem(d) {
    if (!d.id) {
      throw new Error("No id");
    }
    return {
      id: d.id,
      fill: d.color || Color.randomDefaultColor(),
    };
  }

  static regionIDListToIdx(regionIDList) {
    return Object.fromEntries(
      regionIDList.map((id) => [id, Config.initItem({ id })])
    );
  }

  static fromRegionIDList(regionIDList) {
    return new Config(Config.regionIDListToIdx(regionIDList));
  }

  // Instances
  static DEFAULT = Config.fromRegionIDList([
    "LK-11",
    "LK-12",
    "LK-13",
    "LK-2",
    "LK-3",
    "LK-4",
    "LK-5",
    "LK-6",
    "LK-7",
    "LK-8",
    "LK-9",
  ]);
}
