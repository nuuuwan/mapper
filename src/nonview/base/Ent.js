import WWW from "./WWW.js";

import EntType from "./EntType.js";
import { EmailTwoTone } from "@mui/icons-material";

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
    return entA.name.localeCompare(entB.name);
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

  static _idxFromList(entList) {
    return Object.fromEntries(entList.map((ent) => [ent.id, ent]));
  }

  static async idxFromType(entType) {
    const entList = await Ent.listFromType(entType);
    return Ent._idxFromList(entList);
  }

  static async listFromTypeList(entTypeList) {
    const entList = [];
    for (const entType of entTypeList) {
      entList.push(...(await Ent.listFromType(entType)));
    }
    return entList;
  }

  static async idxFromTypeList(entTypeList) {
    const entList = await Ent.listFromTypeList(entTypeList);
    return Ent._idxFromList(entList);
  }
}
