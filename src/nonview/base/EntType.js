const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";

export default class EntType {
  constructor(id, instanceOf) {
    this.id = id;
    this.instanceOf = instanceOf;
  }

  // Getters
  get dataURL() {
    return `${URL_BASE}/${this.id}.latest.basic.tsv`;
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
    (entId) => EntType.isLKRegion(entId) && entId.length === 4
  );
  static DISTRICT = new EntType(
    "district",
    (entId) => EntType.isLKRegion(entId) && entId.length === 5
  );
  static DSD = new EntType(
    "dsd",
    (entId) => EntType.isLKRegion(entId) && entId.length === 7
  );

  static ED = new EntType(
    "ed",
    (entId) => EntType.isECRegion(entId) && entId.length === 5
  );
  static PD = new EntType(
    "pd",
    (entId) => EntType.isECRegion(entId) && entId.length === 6
  );

  static ALL = [
    EntType.PROVINCE,
    EntType.DISTRICT,
    EntType.DSD,
    EntType.ED,
    EntType.PD,
  ];
}
