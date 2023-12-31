import StringX from "./StringX";
const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";

export default class EntType {
  constructor(id, instanceOf, getParentId) {
    this.id = id;
    this.instanceOf = instanceOf;
    this.getParentId = getParentId;
  }

  // Getters
  toString() {
    return this.longName;
  }
  get dataURL() {
    return `${URL_BASE}/${this.id}.latest.basic.tsv`;
  }

  get shortName() {
    if (this.id.length <= 3) {
      return this.id.toUpperCase();
    }
    return StringX.toTitleCase(this.id);
  }

  get longName() {
    if (this.shortName.length <= 3) {
      return {
        ed: "Electoral District",
        pd: "Polling Division",
        dsd: "Divisional Secretariat Division",
        gnd: "Grama Niladhari Division",
      }[this.id];
    }
    return this.shortName;
  }

  // Loaders
  static isLKRegion(entId) {
    return entId.substring(0, 3) === "LK-";
  }

  static isECRegion(entId) {
    return entId.substring(0, 3) === "EC-";
  }

  static fromEntId(entId) {
    return EntType.ALL.find((entType) => entType.instanceOf(entId));
  }

  // static instances
  static PROVINCE = new EntType(
    "province",
    (entId) => EntType.isLKRegion(entId) && entId.length === 4,
    (entId) => "LK"
  );
  static DISTRICT = new EntType(
    "district",
    (entId) => EntType.isLKRegion(entId) && entId.length === 5,
    (entId) => entId.substring(0, 4)
  );
  static DSD = new EntType(
    "dsd",
    (entId) => EntType.isLKRegion(entId) && entId.length === 7,
    (entId) => entId.substring(0, 5)
  );

  static ED = new EntType(
    "ed",
    (entId) => EntType.isECRegion(entId) && entId.length === 5,
    (entId) => "LK"
  );
  static PD = new EntType(
    "pd",
    (entId) => EntType.isECRegion(entId) && entId.length === 6,
    (entId) => entId.substring(0, 5)
  );

  static ALL = [
    EntType.PROVINCE,
    EntType.DISTRICT,
    EntType.DSD,
    EntType.ED,
    EntType.PD,
  ];
}
