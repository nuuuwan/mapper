import Config from "./Config";
import { EntType, Ent, GIG2, GIG2TableMetadata, GIG2TableStyle } from "../base";
import { GIG2_TABLE_NAMES } from "../constants";
export default class ConfigFactory {
  static async fromEntType(entType) {
    const ents = await Ent.listFromType(entType);
    const entIds = ents.map((ent) => ent.id);
    const name = entType.longName + "s colored randomly";
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

  static async fromTableName(tableName) {
    const table = await GIG2.getTable(tableName);
    const tableMetaData = new GIG2TableMetadata(tableName);
    const entityKind = tableMetaData.entity;

    let entType = EntType.PROVINCE;
    if (entityKind === "regions-ec") {
      entType = EntType.ED;
    } else {
      entType = EntType.PROVINCE;
    }
    const ents = await Ent.listFromType(entType);
    const regionIds = ents.map((ent) => ent.id);

    const regionIdToValue = Object.fromEntries(
      regionIds.map(function (regionId) {
        const value = table.getRowByID(regionId).getMaxValueKeyAndValue()[0];
        return [regionId, value];
      })
    );
    const values = Object.values(regionIdToValue);
    const valueToColor = Object.fromEntries(
      values.map(function (value) {
        const color = GIG2TableStyle.getValueKeyColor(value);
        return [value, color];
      })
    );

    const configName =
      tableMetaData.time +
      " " +
      tableMetaData.measurementLowest +
      " by " +
      entType.longName;
    const config = new Config(configName, regionIdToValue, valueToColor);

    return config;
  }
  static async gig2() {
    const MAX_TABLES_HACK = 1;
    const configList = await Promise.all(
      GIG2_TABLE_NAMES.slice(0, MAX_TABLES_HACK).map(async function (tableName) {
        return await ConfigFactory.fromTableName(tableName);
      })
    );
    return configList;
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
      new Config(
        "Trincomalee PDs by Ethnicity",
        {
          "EC-14A": "Sinhala",
          "EC-14B": "Tamil",
          "EC-14C": "Muslim",
        },
        {
          Sinhala: "#941E32",
          Muslim: "#005f56",
          Tamil: "#df7500",
        }
      ),
    ];
  }

  static async all() {
    const all = await ConfigFactory.allFromEntTypes();
    const gig2 = await ConfigFactory.gig2();
    const custom = await ConfigFactory.custom();
    return [].concat(all, gig2, custom);
  }

  static async default() {
    const defaultConfig = (await ConfigFactory.all())[0];

    return defaultConfig;
  }
}
