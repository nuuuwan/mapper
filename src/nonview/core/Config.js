import { Color } from "../../nonview/base";
var md5 = require("md5");
const HASH_LENGTH = 8;

export default class Config {
  constructor(regionInfoIdx) {
    this.regionInfoIdx = regionInfoIdx;
  }

  get hash() {
    return md5(this.toString()).substring(0, HASH_LENGTH);
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

  get fileName() {
    return `config-${this.hash}.json`;
  }

  // Updating

  update(regionId, newInfo) {
    this.regionInfoIdx[regionId] = newInfo;
  }

  addRegions(regionIds) {
    for (const id of regionIds) {
      if (this.regionInfoIdx[id]) {
        continue;
      }
      this.regionInfoIdx[id] = Config.initItem({ id });
    }
  }

  deleteRegions(regionIds) {
    for (const regionId of regionIds) {
      delete this.regionInfoIdx[regionId];
    }
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

  static regionIdListToIdx(regionIdList) {
    return Object.fromEntries(
      regionIdList.map((id) => [id, Config.initItem({ id })])
    );
  }

  static fromRegionIdList(regionIdList) {
    return new Config(Config.regionIdListToIdx(regionIdList));
  }

  // Instances
  static DEFAULT = Config.fromRegionIdList([
    // "LK-1",
    // "LK-2",
    // "LK-3",
    // "LK-4",
    // "LK-5",
    // "LK-6",
    // "LK-7",
    // "LK-8",
    // "LK-9",
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
  ]);
}
