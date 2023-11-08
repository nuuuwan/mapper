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
  static DEFAULT = Config.fromRegionIdList(["EC-02A", "EC-01A", "EC-01B"]);
}
