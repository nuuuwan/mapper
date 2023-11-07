var md5 = require("md5");

export default class Config {
  constructor(regionInfoList) {
    this.regionInfoList = regionInfoList;
  }

  get hash() {
    return md5(this.toString());
  }

  get sortedRegionInfoList() {
    return this.regionInfoList.sort((a, b) => a.id.localeCompare(b.id));
  }

  get nRegions() {
    return this.regionInfoList.length;
  }

  // Updating

  update(regionID, newInfo) {
    let newRegionInfoList = [];
    for (let regionInfo of this.regionInfoList) {
      if (regionInfo.id === regionID) {
        regionInfo = Object.assign({}, regionInfo, newInfo);
      }
      newRegionInfoList.push(regionInfo);
    }
    this.regionInfoList = newRegionInfoList;
  }

  setRegionIDs(regionIDs) {
    return (this.regionInfoList = regionIDs.map((regionID) => ({
      id: regionID,
    })));
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
      return "";
    }
  }

  // Instances
  static DEFAULT = new Config(
    [
      "LK-1",
      "LK-2",
      "LK-3",
      "LK-4",
      "LK-5",
      "LK-6",
      "LK-7",
      "LK-8",
      "LK-9",
    ].map((id) => ({ id }))
  );
}
