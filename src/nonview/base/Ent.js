import WWW from "./WWW.js";

import EntType from "./EntType.js";

export default class Ent {
  constructor(id, name, centroid) {
    this.id = id;
    this.name = name;
    this.centroid = centroid;
  }

  // Getters
  get entType() {
    return EntType.fromEntId(this.id);
  }

  get label() {
    return this.name + ' ' + this.entType.shortName;
  }

  // Serializing
  toDict() {
    return {
      id: this.id,
      name: this.name,
      centroid: JSON.stringify(this.centroid),
    };
  }

  static fromDict(d) {
    return new Ent(d.id, d.name, JSON.parse(d.centroid));
  }

  // Loaders
  static async fromId(id) {
    const entType = EntType.fromEntId(id);
    const entIdx = await Ent.idxFromType(entType);
    return entIdx[id];
  }
  static async listFromType(entType) {
    const rawEnts = (await WWW.tsv(entType.dataURL)).filter(
      (rawEnt) => !(rawEnt.id.startsWith("EC") && rawEnt.id.endsWith("P"))
    );
    return rawEnts.map((ent) => Ent.fromDict(ent));
  }

  static async idxFromType(entType) {
    const entList = await Ent.listFromType(entType);
    return Object.fromEntries(entList.map((ent) => [ent.id, ent]));
  }

  static async listFromTypeList(entTypeList) {
    const entList = [];
    for (const entType of entTypeList) {
      entList.push(...(await Ent.listFromType(entType)));
    }
    return entList;
  }
}
