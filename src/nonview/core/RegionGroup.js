import { Ent, EntType } from "../base";

export default class RegionGroup {
  constructor(name, regionIdList) {
    this.name = name;
    this.regionIdList = regionIdList;
  }

  static async fromType(regionEntType) {
    const regionEnts = await Ent.listFromType(regionEntType);
    const regionIdList = regionEnts.map((regionEnt) => regionEnt.id);
    return new RegionGroup(
      "All " + regionEntType.shortName + "s",
      regionIdList
    );
  }

  static async all() {
    return [
      await RegionGroup.fromType(EntType.PROVINCE),
      await RegionGroup.fromType(EntType.DISTRICT),
      await RegionGroup.fromType(EntType.ED),
    ];
  }
}
