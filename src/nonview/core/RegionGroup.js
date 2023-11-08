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

  static async fromTypes() {
    return [
      await RegionGroup.fromType(EntType.PROVINCE),
      await RegionGroup.fromType(EntType.DISTRICT),
      await RegionGroup.fromType(EntType.ED),
    ];
  }

  static async similar(entIds) {
    const ents = await Promise.all(entIds.map((entId) => Ent.fromId(entId)));
    const similarEnts = await Ent.getSimilarEnts(ents);

    return similarEnts.map((ent) => new RegionGroup(ent.label, [ent.id]));
  }
}
