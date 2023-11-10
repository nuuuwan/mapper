import Config from "./Config";
import { EntType, Ent } from "../base";

export default class ConfigFactory {
  static async fromEntType(entType) {
    const ents = await Ent.listFromType(entType);
    const entIds = ents.map((ent) => ent.id);
    const name = entType.longName + "s (random coloring)";
    const config = Config.fromRegionIdList(name, entIds);
    await config.autoColor();
    return config;
  }

  static async allFromEntTypes() {
    const entList = [EntType.PROVINCE, EntType.DISTRICT, EntType.ED];
    return await Promise.all(
      entList.map(async function (entType) {
        return await ConfigFactory.fromEntType(entType);
      })
    );
  }

  static async custom() {
    return [
      Config.fromRegionIdList("CMC Polling Divisions", [
        "EC-01A",
        "EC-01B",
        "EC-01C",
        "EC-01D",
        "EC-01E",
      ]),
    ];
  }

  static async all() {
    const all = await ConfigFactory.allFromEntTypes();
    const custom = await ConfigFactory.custom();
    return [].concat(all, custom);
  }

  static async default() {
    const defaultConfig = (await ConfigFactory.all())[0];

    return defaultConfig;
  }
}
