import WWW from "./WWW.js";

import EntType from "./EntType.js";

export default class Ent {
  constructor(id, name, centroid, population, area) {
    this.id = id;
    this.name = name;
    this.centroid = centroid;
    this.population = population;
    this.area = area;
  }

  // Getters
  get entType() {
    return EntType.fromEntId(this.id);
  }

  get label() {
    return this.name + " " + this.entType.shortName;
  }

  // Serializing
  toDict() {
    return {
      id: this.id,
      name: this.name,
      centroid: JSON.stringify(this.centroid),
      population: this.population,
      area: this.area,
    };
  }

  static fromDict(d) {
    return new Ent(d.id, d.name, JSON.parse(d.centroid), d.population, d.area);
  }

  // sorting

  static cmp(entA, entB) {
    return Ent.cmpName(entA, entB);
  }

  static cmpPopulation(entA, entB) {
    return entB.population - entA.population;
  }

  static cmpName(entA, entB) {
    return entA.name.localeCompare(entB.name);
  }

  static cmpEntType(entA, entB) {
    return entA.entType.id.localeCompare(entB.entType.id);
  }

  static cmpEntTypeAndName(entA, entB) {
    return Ent.cmpEntType(entA, entB) || Ent.cmpName(entA, entB);
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
