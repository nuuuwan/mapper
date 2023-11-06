var md5 = require("md5");

export default class Config {
  constructor(regionInfoList) {
    this.regionInfoList = regionInfoList;
  }

  get hash() {
    return md5(this.toString());
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
  static DEFAULT = new Config([
    {
      id: "LK-1",
    },
    {
      id: "LK-2",
    },
    {
      id: "LK-3",
    },
    {
      id: "LK-4",
    },
    {
      id: "LK-5",
    },
    {
      id: "LK-6",
    },
    {
      id: "LK-7",
    },
    {
      id: "LK-8",
    },
    {
      id: "LK-9",
    },
  ]);
}
